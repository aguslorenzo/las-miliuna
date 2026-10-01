import { Search } from "lucide-react";

export function SearchBar() {
    return (
        <div className="w-full max-w-xs relative">
            <input type="text" placeholder="¿Qué estás buscando?" className="w-full py-2 pl-4 pr-10 bg-neutral-100 text-neutral-700 placeholder:text-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full" />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-800">
                <Search className="w-4 h-4" />
            </button>
        </div>
    );
}