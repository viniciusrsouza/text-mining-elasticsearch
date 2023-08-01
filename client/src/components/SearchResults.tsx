import { Box, Button, Skeleton, Typography } from "@mui/joy";
import { Essay } from "../types/api";
import { useCallback, useState } from "react";
import { SxProps } from "@mui/joy/styles/types";

type Props = {
  query: string;
  isLoading?: boolean;
  isLoadingMore?: boolean;
  hasMore?: boolean;
  fetchMore?: () => void;
  data?: Essay[];
  total?: number;
};

function LoadingItem() {
  return (
    <Box position="relative">
      <Skeleton width="100%" height="100%" />
    </Box>
  );
}

function SearchResults({
  query,
  isLoading,
  hasMore,
  fetchMore,
  isLoadingMore,
  data = [],
  total = 0,
}: Props) {
  if (isLoading) {
    return (
      <Box
        position="relative"
        display="grid"
        gridTemplateColumns="1fr"
        gridAutoRows="4rem"
        gap="0.5rem"
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <LoadingItem key={i} />
        ))}
      </Box>
    );
  }

  return (
    <Box>
      <Box display="flex" alignItems="center" gap="0.25rem">
        <Typography level="body2">Query: {query}</Typography>
        <Typography level="body4">
          ({data.length} of {total} results)
        </Typography>
      </Box>
      <Box display="flex" flexDirection="column" gap="1.5rem" pt="2rem">
        {data.map((result) => (
          <EssayItem key={result.essay_id} {...result} />
        ))}
      </Box>
      {hasMore && (
        <Box mt="1.5rem" mb="3rem">
          <Button
            onClick={fetchMore}
            loading={isLoadingMore}
            fullWidth
            variant="outlined"
          >
            Load more
          </Button>
        </Box>
      )}
    </Box>
  );
}

const highlightStyle: SxProps = {
  "& .highlight em": {
    backgroundColor: "primary.100",
    borderRadius: "0.25rem",
    padding: "0.125rem 0.125rem",
    fontWeight: "bold",
  },
};

function EssayItem({ essay_id, essay, highlight }: Essay) {
  const preview = (highlight?.slice(0, 2) ?? []).join(" … ");

  const [expanded, setExpanded] = useState(false);
  const toggle = useCallback(() => setExpanded((prev) => !prev), []);

  return (
    <Box boxShadow={3}>
      <Typography level="body1">#{essay_id}</Typography>
      <Typography level="body2" sx={highlightStyle}>
        {!expanded && (
          <span
            className="highlight"
            dangerouslySetInnerHTML={{ __html: preview }}
          />
        )}
        {expanded && essay}
        <Button
          variant="plain"
          size="sm"
          sx={{ ml: "0.25rem", fontSize: "0.75rem" }}
          onClick={toggle}
        >
          {expanded ? "Hide" : "See more..."}
        </Button>
      </Typography>
    </Box>
  );
}

export default SearchResults;
