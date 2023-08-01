import { useCallback, useState } from "react";
import { Box, Button, Input } from "@mui/joy";

type Props = {
  value: string;
  onChange: (value: string) => void;
  isLoading?: boolean;
};

function SearchField({ value, onChange, isLoading = false }: Props) {
  const [innerValue, setInnerValue] = useState(value);

  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      onChange(innerValue);
    },
    [innerValue, onChange]
  );

  return (
    <Box
      component="form"
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="100%"
      gap="0.5rem"
      onSubmit={onSubmit}
    >
      <Input
        placeholder="Search..."
        name="search"
        value={innerValue}
        onChange={useCallback(
          (e: React.ChangeEvent<HTMLInputElement>) =>
            setInnerValue(e.target.value),
          []
        )}
      />
      <Button type="submit" sx={{ borderRadius: "8rem" }} loading={isLoading}>
        Search
      </Button>
    </Box>
  );
}

export default SearchField;
