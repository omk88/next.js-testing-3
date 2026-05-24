import { Search } from "lucide-react";
import { Input } from "../ui/input";

export function SearchInput() {
    return (
        <div className="relative w-full max-w-sm">
            <div className="relative">
                <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />

                <Input className="w-full pl-8 bg-background" type="search" placeholder="Search Posts..." />
            </div>
        </div>
    );
}