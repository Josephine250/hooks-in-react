import { useState, useEffect } from "react";

const getSize = () => ({
  width: typeof window === "undefined" ? 0 : window.innerWidth,
  height: typeof window === "undefined" ? 0 : window.innerHeight,
});

// Input: none. Returns: { width, height }.
// State: size. Effect: adds a resize listener. Cleanup: removes it.
export function useWindowSize() {
  const [size, setSize] = useState(getSize);

  useEffect(() => {
    const onResize = () => setSize(getSize());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return size;
}