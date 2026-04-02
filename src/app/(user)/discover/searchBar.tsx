"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState(searchParams.get("q") || "");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (query) {
      params.set("q", query);
    } else {
      params.delete("q");
    }
    router.push(`/discover?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="flex w-full sm:max-w-sm items-center space-x-2">
      <Input
        type="search"
        placeholder="Search quizzes by topic..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="bg-background border-neutral-700/60 flex-1"
      />
      <Button type="submit" size="icon" className="bg-blue-600 hover:bg-blue-500 text-white shrink-0">
        <Search className="h-4 w-4" />
      </Button>
    </form>
  );
}
