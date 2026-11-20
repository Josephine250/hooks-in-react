import { useState, useCallback } from "react";

// Input: initial boolean. Returns: [value, toggle, setValue]
// State: one boolean. Effect: none. Cleanup: none.
export function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);
  const toggle = useCallback(() => setValue((v) => !v), []);
  return [value, toggle, setValue];
}