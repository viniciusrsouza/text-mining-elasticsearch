import { Box } from "@mui/joy";
import { SearchField, SearchResults } from "../components";
import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { essays_service } from "../services";

function Home() {
  const [query, setQuery] = useState("");

  const {
    data,
    isInitialLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["search", query],
    queryFn: ({ pageParam }) =>
      essays_service.search(pageParam ?? { query, limit: 10, offset: 0 }),
    enabled: Boolean(query),
    getNextPageParam: (lastPage) => lastPage.next,
  });

  const results = data?.pages.flatMap((page) => page.results) ?? [];
  const total = data?.pages[0]?.count ?? 0;

  return (
    <Box
      maxWidth="600px"
      margin="0 auto"
      mt="2rem"
      display="flex"
      flexDirection="column"
      gap="1rem"
    >
      <SearchField
        value={query}
        onChange={setQuery}
        isLoading={isInitialLoading}
      />
      <SearchResults
        query={query}
        data={results}
        isLoading={isInitialLoading}
        isLoadingMore={isFetchingNextPage}
        hasMore={hasNextPage}
        fetchMore={fetchNextPage}
        total={total}
      />
    </Box>
  );
}

export default Home;
