 ### 1. Diagnóstico actual de /backend
  
  Al revisar backend/build.gradle.kts, backend/src/main/resources/application.yaml y backend/src/main/java/com/miliuna/api/ApiApplication.java, encontré 4 discrepancias importantes respecto al objetivo del Spec 0 y 
  a openspec/project.md:                                                                                                                                                                                               
  
  1. Versión de Spring Boot en build.gradle.kts (4.1.2 vs 3.x):
      • Actualmente build.gradle.kts tiene id("org.springframework.boot") version "4.1.2" con Gradle 9.8.2.
      • Tanto tu requerimiento como openspec/project.md especifican Spring Boot 3 (ej. 3.4.x / 3.5.x). Además, en Spring Boot 4 cambian nombres de starters y compatibilidad con springdoc-openapi.
  2. Esqueleto vacío de dependencias:
      • Solo tiene spring-boot-starter (core básico sin servidor web) y spring-boot-starter-test.
  3. Paquete raíz actual (com.miliuna.api vs com.miliuna.pos):
      • Existe com.miliuna.api.ApiApplication, mientras que la arquitectura objetivo plantea com.miliuna.pos.
  4. Configuración en application.yaml:
      • Solo contiene spring.application.name: api. Faltan las propiedades de DataSource, Hikari, Flyway, Hibernate (ddl-auto: validate, open-in-view: false), CORS, JWT y DataSeeder.
  
  ──────
  ### 2. Dependencias necesarias para dejar el esqueleto completo
                                                                                                                                                                                                                       
  Para cumplir con todos los requisitos del Spec 0, este es el mapa de dependencias que debemos incorporar en backend/build.gradle.kts:                                                                                
  
   Categoría         │ Dependencia Gradle                                                                                     │ Propósito en Spec 0
  ───────────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────┼────────────────────────────────────────────────────────────────────────────────────────
   Web & REST        │ org.springframework.boot:spring-boot-starter-web                                                       │ Tomcat embebido, @RestController, soporte nativo ProblemDetail (RFC 7807)
   Validación        │ org.springframework.boot:spring-boot-starter-validation                                                │ Bean Validation (@Valid, @NotNull, @PositiveOrZero) en DTOs y entidades
   Persistencia      │ org.springframework.boot:spring-boot-starter-data-jpa                                                  │ Hibernate 6 (soporte nativo @JdbcTypeCode(SqlTypes.JSON) para JSONB), repositorios JPA
   Migraciones       │ org.flywaydb:flyway-coreorg.flywaydb:flyway-database-postgresql                                        │ Ejecución determinística de V1__init_core_schema.sql al inicio
   Driver DB         │ org.postgresql:postgresql (runtimeOnly)                                                                │ Driver JDBC para PostgreSQL 16
   Seguridad         │ org.springframework.boot:spring-boot-starter-security                                                  │ Filtros HTTP stateless, BCryptPasswordEncoder, protección por roles
   JWT               │ Opción A (Recomendada): spring-boot-starter-oauth2-resource-serverOpción B: io.jsonwebtoken:jjwt-      │ Emisión y validación de JWT stateless (ver comparativa abajo)
                     │ api:0.12.6 (+ impl y jackson)                                                                          │
   OpenAPI / Swagger │ org.springdoc:springdoc-openapi-starter-webmvc-ui:2.8.x                                                │ Documentación interactiva de endpoints y esquemas
   Testing           │ org.springframework.security:spring-security-testTestcontainers (postgresql, junit-jupiter) o H2       │ Verificación de contexto, migración Flyway y tests de endpoints/guards
                     │ (MODE=PostgreSQL)                                                                                      │
  
  #### Comparativa rápida para JWT en Spring Security 6:
  
    +-------------------------------------------------------------------------+
    |               JWT EN SPRING SECURITY: NIMBUS vs JJWT                    |
    +-------------------------------------------------------------------------+
    |                                                                         |
    |  [Opcion A: oauth2-resource-server]   [Opcion B: jjwt 0.12.6]           |
    |  * Oficial de Spring Boot             * Libreria externa (3 artefactos) |
    |  * Usa NimbusJwtDecoder / Encoder     * Requiere filtro custom manual   |
    |    con SecretKey (HMAC-SHA256)          (OncePerRequestFilter)          |
    |  * Se integra directo con             * Muy conocida, control manual    |
    |    SecurityFilterChain DSL              total del parseo de claims      |
    +-------------------------------------------------------------------------+
  
  Recomendación: Opción A (oauth2-resource-server) con clave simétrica HMAC-SHA256 (JwtEncoder + JwtDecoder) evita escribir y mantener un JwtAuthenticationFilter manual y mapea directo claims como role, store_id y 
  user_id a GrantedAuthority. Si preferís el clásico JwtAuthenticationFilter con jjwt, también es 100% viable. 
  ──────
  ### 3. Revisión de V1__init_core_schema.sql, Índices y Concurrencia
  
    +-----------------------------------------------------------------------------+
    |                MODELO MULTI-TENANT LOGICO ("CABALLO DE TROYA")              | 
    +-----------------------------------------------------------------------------+
  
                               +--------------------+
                               |       stores       | 
                               | (operational_mode) | 
                               +---------+----------+
                                         | 1
                +------------------------+------------------------+ 
                |                        |                        |
                | *                      | *                      | * 
    +-----------+-----------+  +---------+----------+   +---------+----------+ 
    |    store_merchants    |  |      products      |   |       orders       |
    |  UNIQUE(store, merch) |  |  UNIQUE(store,sku) |   | UNIQUE(store,num)? |
    +-----------+-----------+  |  version (BIGINT)  |   +---------+----------+ 
                | *            +---------+----------+             | 1
                |                        | 1                      |
                | 1                      | *                      | *
    +-----------+-----------+  +---------+----------+             |
    |       merchants       |  |    order_items     |<------------+ 
    |   (user_id nullable)  |  | (snapshot prices)  | 
    +-----------+-----------+  +--------------------+
                | 0..1 
                | 
    +-----------+-----------+
    |         users         |
    |   (ADMIN / MERCHANT)  |
    +-----------------------+
  
  #### A. Observaciones de Integridad y Multi-Tenancy en el DDL
  
  1. orders.order_number y Multi-Tenancy: 
      • En el contrato figura order_number (VARCHAR unique). Si es UNIQUE(order_number) global, dos tiendas distintas en el futuro no podrían tener ambas la orden "ORD-0001".
      • Sugerencia: Definir UNIQUE (store_id, order_number) en lugar de UNIQUE global (igual que hiciste con categories(store_id, slug) y products(store_id, sku)). 
  2. products — Concurrencia Híbrida (Optimistic + Pessimistic Locking):
      • El campo version BIGINT NOT NULL DEFAULT 0 anotado con @Version en JPA resuelve el Optimistic Locking: si dos transacciones leen stock_available = 1 y version = 0, el UPDATE products SET stock_available = 0,
      version = 1 WHERE id = ? AND version = 0 de la segunda transacción actualiza 0 filas y lanza ObjectOptimisticLockingFailureException (que el @RestControllerAdvice transforma en 409 Conflict).
      • Además, como la PK (id) está indexada, el repositorio puede exponer en futuros specs @Lock(LockModeType.PESSIMISTIC_WRITE) (SELECT ... FOR UPDATE) para bloquear las filas de products ordenadas por id durante
      el checkout o reserva de IG Live.
      • Constraints defensivos en DB (CHECK): Conviene agregar en V1__init_core_schema.sql:
          • CONSTRAINT chk_products_stock CHECK (stock_available >= 0 AND stock_reserved >= 0 AND initial_quantity >= 0) 
          • CONSTRAINT chk_products_price CHECK (unit_price >= 0)
          Esto garantiza a nivel motor PostgreSQL que jamás exista stock negativo aunque hubiera un bug en capas superiores. 
  
  3. Auditoría temporal consistente (TIMESTAMPTZ):
      • Usar TIMESTAMPTZ NOT NULL DEFAULT NOW() para todos los created_at y updated_at (mapeados a Instant o OffsetDateTime en Java 21) para evitar desfases horarios entre el servidor y Argentina 
      (America/Argentina/Buenos_Aires).
  4. Relación users y stores (Admin Multi-Tenant): 
      • Hoy users tiene (id, email, password_hash, role, is_active, created_at) sin store_id. Los MERCHANT se vinculan a tiendas mediante merchants -> store_merchants. 
      • Para el usuario ADMIN (Milagros), ¿querés que agreguemos default_store_id UUID REFERENCES stores(id) (nullable) en users, o que en este MVP el store_id activo se resuelva por el slug por defecto (las-mili-y-
      una) e vaya embebido como claim en el JWT al hacer login?
  
  
  #### B. Índices recomendados en V1__init_core_schema.sql
  
  En un esquema multi-tenant donde todas las consultas filtran por store_id, PostgreSQL necesita que store_id sea la primera columna de los índices compuestos: 
  
   Tabla                   │ Índice Propuesto                                                                                        │ Caso de Uso Crítico
  ─────────────────────────┼─────────────────────────────────────────────────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────
   products                │ UNIQUE (store_id, sku) (ya incluido)                                                                    │ Búsqueda instantánea por lectora/tipeo de SKU en POS (O(log n)).
   products                │ idx_products_store_catalog ON products (store_id, is_active, channel_visibility, category_id)           │ Listado y filtrado del catálogo público web y grilla POS.
   products                │ idx_products_store_merchant ON products (store_id, merchant_id)                                         │ Vista de inventario por emprendedor y liquidaciones.
   orders                  │ idx_orders_store_status_created ON orders (store_id, status, created_at DESC)                           │ Tablero operativo de órdenes e historial.
   orders                  │ idx_orders_pending_expiration ON orders (status, reservation_expires_at) WHERE reservation_expires_at   │ Índice parcial (Partial Index): permite que un futuro job de expiración de
                           │ IS NOT NULL                                                                                             │ reservas IG Live / checkout encuentre órdenes vencidas sin escanear toda la
                           │                                                                                                         │ tabla orders.
   order_items             │ idx_order_items_order ON order_items (order_id) y idx_order_items_merchant ON order_items (merchant_id) │ Joins de detalle de orden y métricas por emprendedor.
   merchant_ledger_entries │ idx_ledger_store_merchant_created ON merchant_ledger_entries (store_id, merchant_id, created_at DESC)   │ Estado de cuenta corriente de cada emprendedor en una tienda.
   shipping_zones          │ idx_shipping_zones_store_active ON shipping_zones (store_id, is_active)                                 │ Cálculo rápido de costo de envío en checkout.
  ──────
  ### 4. Mecanismo de Modo Operativo y Estructura de Paquetes
  
  #### Flujo del Guardia Operativo (@RequireOnlineStoreOpen)
  
    +----------------------------------------------------------------------------+
    |             FLUJO DE BLOQUEO OPERATIVO ("CARRERA ANALOGica")               |
    +----------------------------------------------------------------------------+ 
  
      [Cliente Web (Vercel)]                        [Admin POS (Milagros)] 
               |                                              | 
               | 1. POST /api/v1/public/checkout/...          | PATCH /api/v1/admin/store/operational-mode
               v                                              v { "mode": "POS_OPEN_WEB_PAUSED" }
      +-----------------------------------+         +----------------------------+ 
      |   StoreOperationalModeInterceptor |         |  AdminStoreController      |
      |   (detecta @RequireOnlineStoreOpen|         |  Actualiza Store en DB     | 
      |    en el HandlerMethod / Clase)   |         +----------------------------+
      +-----------------+-----------------+ 
                        |
                        v
          Lee Store.operationalMode (por storeId / default store)
                        |
            +-----------+-----------+
            |                       |
       ONLINE_OPEN         POS_OPEN_WEB_PAUSED 
            |                       |
            v                       v
      [Pasa al Controller]   [Lanza StoreWebPausedException]
                                    | 
                                    v                                                                                                                                                                                  
                     [@RestControllerAdvice -> HTTP 423 Locked]                                                                                                                                                        
                     ProblemDetail RFC 7807 (en espanol):                                                                                                                                                              
                     title: "Tienda online pausada temporalmente"                                                                                                                                                      
                     detail: "El local fisico se encuentra abierto..."                                                                                                                                                 
                                                                                                                                                                                                                       
  Por qué HTTP 423 Locked (WebDAV / RFC 4918) es ideal acá: Distingue semánticamente en el frontend de React entre "La tienda web está pausada porque abrió el local físico" (423 Locked -> muestra pantalla/modal de  
  horarios de atención física) y "Alguien más acaba de comprar este último producto" (409 Conflict -> actualiza el carrito).                                                                                           
                                                                                                                                                                                                                       
  #### Propuesta de Estructura de Paquetes (com.miliuna.pos)                                                                                                                                                           
                                                                                                                                                                                                                       
  Siguiendo el lineamiento de Monolito Modular (package-by-feature) de openspec/project.md:                                                                                                                            
                                                                                                                                                                                                                       
    com.miliuna.pos                                                                                                                                                                                                    
    ├── PosApplication.java                                                                                                                                                                                            
    ├── common/                                                                                                                                                                                                        
    │   ├── config/                                                                                                                                                                                                    
    │   │   ├── CorsConfig.java                  # Orígenes parametrizados por env (app.cors.allowed-origins)                                                                                                          
    │   │   ├── OpenApiConfig.java               # Configuración Swagger / JWT Bearer scheme                                                                                                                           
    │   │   └── WebMvcConfig.java                # Registro del StoreOperationalModeInterceptor                                                                                                                        
    │   ├── exception/                                                                                                                                                                                                 
    │   │   ├── GlobalExceptionHandler.java      # @RestControllerAdvice -> ProblemDetail (RFC 7807)                                                                                                                   
    │   │   ├── ResourceNotFoundException.java   # -> 404 Not Found                                                                                                                                                    
    │   │   ├── BusinessConflictException.java   # -> 409 Conflict (incluye OptimisticLocking)                                                                                                                         
    │   │   └── StoreWebPausedException.java     # -> 423 Locked                                                                                                                                                       
    │   ├── guard/                                                                                                                                                                                                     
    │   │   ├── RequireOnlineStoreOpen.java      # Anotación @Target({METHOD, TYPE})                                                                                                                                   
    │   │   └── StoreOperationalModeInterceptor.java # HandlerInterceptor que verifica operational_mode                                                                                                                
    │   └── seed/                                                                                                                                                                                                      
    │       └── DataSeeder.java                  # ApplicationRunner condicional (app.seeder.enabled)                                                                                                                  
    ├── auth/                                                                                                                                                                                                          
    │   ├── config/                                                                                                                                                                                                    
    │   │   ├── SecurityConfig.java              # SecurityFilterChain stateless, rutas públicas vs admin                                                                                                              
    │   │   └── JwtProperties.java               # @ConfigurationProperties(prefix = "app.security.jwt")                                                                                                               
    │   ├── domain/                                                                                                                                                                                                    
    │   │   ├── User.java                                                                                                                                                                                              
    │   │   ├── UserRole.java                    # ADMIN, MERCHANT                                                                                                                                                     
    │   │   └── UserRepository.java                                                                                                                                                                                    
    │   └── service/                                                                                                                                                                                                   
    │       └── JwtService.java                  # Generación/validación base de JWT                                                                                                                                   
    ├── store/                                                                                                                                                                                                         
    │   ├── api/                                                                                                                                                                                                       
    │   │   ├── PublicStoreController.java       # GET /api/v1/public/store/status                                                                                                                                     
    │   │   ├── AdminStoreController.java        # PATCH /api/v1/admin/store/operational-mode                                                                                                                          
    │   │   └── dto/                                                                                                                                                                                                   
    │   │       ├── StoreStatusResponse.java                                                                                                                                                                           
    │   │       └── UpdateOperationalModeRequest.java                                                                                                                                                                  
    │   ├── domain/                                                                                                                                                                                                    
    │   │   ├── Store.java                                                                                                                                                                                             
    │   │   ├── OperationalMode.java             # ONLINE_OPEN, POS_OPEN_WEB_PAUSED                                                                                                                                    
    │   │   ├── StoreRepository.java                                                                                                                                                                                   
    │   │   ├── ShippingZone.java                                                                                                                                                                                      
    │   │   └── ShippingZoneRepository.java                                                                                                                                                                            
    │   └── service/                                                                                                                                                                                                   
    │       └── StoreService.java                                                                                                                                                                                      
    ├── merchant/                                # (o dentro de store/ o catalog/ según prefieras)                                                                                                                     
    │   └── domain/                                                                                                                                                                                                    
    │       ├── Merchant.java                                                                                                                                                                                          
    │       ├── MerchantRepository.java                                                                                                                                                                                
    │       ├── StoreMerchant.java                                                                                                                                                                                     
    │       ├── PlanTier.java                    # FREE, PRO                                                                                                                                                           
    │       └── StoreMerchantRepository.java                                                                                                                                                                           
    ├── catalog/                                                                                                                                                                                                       
    │   └── domain/                                                                                                                                                                                                    
    │       ├── Category.java                                                                                                                                                                                          
    │       ├── CategoryRepository.java                                                                                                                                                                                
    │       ├── Product.java                     # Con @Version Long version                                                                                                                                           
    │       ├── ChannelVisibility.java           # BOTH, POS_ONLY, WEB_ONLY                                                                                                                                            
    │       ├── ImageStatus.java                 # NONE, PENDING_APPROVAL, APPROVED                                                                                                                                    
    │       └── ProductRepository.java                                                                                                                                                                                 
    ├── order/                                                                                                                                                                                                         
    │   └── domain/                                                                                                                                                                                                    
    │       ├── Order.java                                                                                                                                                                                             
    │       ├── OrderChannel.java                # WEB, IN_STORE, ONLINE_IG_LIVE
    │       ├── OrderStatus.java                 # PENDING_PAYMENT, RESERVED_IG_LIVE, PAID, etc.
    │       ├── PaymentMethod.java               # CASH, CARD, TRANSFER_QR, MERCADOPAGO
    │       ├── FulfillmentType.java             # STORE_PICKUP, SHIPPING
    │       ├── OrderRepository.java
    │       ├── OrderItem.java
    │       └── OrderItemRepository.java
    └── ledger/
        └── domain/
            ├── MerchantLedgerEntry.java
            ├── LedgerEntryType.java             # SALE_CREDIT, PAYOUT_DEBIT, MANUAL_ADJUSTMENT
            └── MerchantLedgerEntryRepository.java
  ──────
  ### Preguntas puntuales para cerrar decisiones antes del /opsx-propose
  
  Para dejar el diseño sin ambigüedades antes de crear el cambio en OpenSpec, confirmame tu preferencia sobre estos 4 puntos:
  
  1. Versión de Spring Boot en build.gradle.kts:
      • ¿Bajamos org.springframework.boot de 4.1.2 a 3.4.5 (o 3.5.0) para cumplir estrictamente con "Spring Boot 3" de project.md y asegurar compatibilidad total con springdoc-openapi y Flyway?
  2. Librería JWT y Lombok:
      • ¿Preferís spring-boot-starter-oauth2-resource-server (nativo de Spring Security 6 con Nimbus) o jjwt (0.12.6) con filtro propio?
      • ¿Incluimos Lombok para las entidades JPA (@Getter, @Setter, @NoArgsConstructor) o preferís Java 21 puro sin Lombok?
  3. Resolución de store_id en el MVP para los endpoints de store:
      • En GET /api/v1/public/store/status y PATCH /api/v1/admin/store/operational-mode, ¿resolvemos el store buscando por el slug default configurado (ej. app.default-store-slug=las-mili-y-una, aceptando           
      opcionalmente un header X-Store-Slug o query param futuro), o preferís que el endpoint reciba el slug/storeId explícito?
  4. Incluir endpoint de Login mínimo en Spec 0 (POST /api/v1/auth/login) o solo infraestructura JWT:
      • Para poder probar de punta a punta PATCH /api/v1/admin/store/operational-mode con el usuario Admin creado por el DataSeeder, ¿incluimos ya en este Spec 0 el endpoint básico POST /api/v1/auth/login que valida
      email/password del Admin y devuelve el JWT, o lo dejamos únicamente con JwtService para testear con tokens generados en tests?