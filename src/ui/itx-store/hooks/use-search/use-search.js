import React from "react";

export const useSearch = (data) => {
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredData = React.useMemo(() => {
    if (!data) return [];
    if (!searchTerm) return data;
    return data.filter(
      (item) =>
        item.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.model.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [data, searchTerm]);

  return { searchTerm, setSearchTerm, filteredData };
};
