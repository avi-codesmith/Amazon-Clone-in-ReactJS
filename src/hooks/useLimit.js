import { useState } from "react";

export function useLimit() {
  const [limit, setLimit] = useState(12);
  function handleLimit() {
    setLimit((prev) => prev + 10);
  }

  return { limit, handleLimit };
}
