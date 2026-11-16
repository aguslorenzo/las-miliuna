# Project Context: Las Miliuna (POS & Multi-brand E-commerce)
- **Repo Structure**: Monorepo (`/backend` in Java 21 + Spring Boot 3 + Gradle Kotlin DSL, `/frontend` in React).
- **Database**: PostgreSQL 16 managed strictly via Flyway SQL migrations (`src/main/resources/db/migration`). Hibernate `ddl-auto` MUST be set to `validate`.
- **Architecture**: Modular Monolith by package-by-feature (`store`, `catalog`, `order`, `pos`, `ledger`, `auth`, `common`).
- **Conventions**: Database tables/columns and Java code in English. User-facing error messages in Spanish (ProblemDetail RFC 7807). Money fields ALWAYS use `BigDecimal` (`NUMERIC(12,2)`). IDs use `UUID`.