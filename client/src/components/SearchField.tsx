import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "../hooks";
import { Box, Button, Input } from "@mui/joy";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

function SearchField({ onChange }: Props) {
  const [innerValue, setInnerValue] = useState("");
  const debounced = useDebounce(innerValue, 500);

  useEffect(() => {
    onChange(debounced);
  }, [onChange, debounced]);

  const onChangeInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInnerValue(e.target.value);
    },
    []
  );

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="100%"
    >
      <Input
        value={innerValue}
        onChange={onChangeInput}
        placeholder="Search..."
      />
      <Button>Search</Button>
    </Box>
  );
}

export default SearchField;
