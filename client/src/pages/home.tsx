import { Box } from "@mui/joy";
import { SearchField, SearchResults } from "../components";
import { useState } from "react";

function Home() {
  const [value, setValue] = useState("");

  return (
    <Box
      maxWidth="600px"
      margin="0 auto"
      mt="2rem"
      display="flex"
      flexDirection="column"
      gap="1rem"
    >
      <SearchField value={value} onChange={setValue} />
      <SearchResults query={value} />
    </Box>
  );
}

export default Home;
