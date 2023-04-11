import { createContext, useEffect, useState } from "react";

const SearchContext = createContext();
export default SearchContext;

export function SearchProvider({ children }) {
  const [search, setSearch] = useState("");

  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
}
