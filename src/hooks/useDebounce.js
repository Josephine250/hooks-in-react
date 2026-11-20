import { useState, useEffect } from "react";


export function useDebounce(value, delay = 500) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id); // runs before the next effect and on unmount
  }, [value, delay]);

  return debounced;
}