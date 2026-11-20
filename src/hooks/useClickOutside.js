import { useEffect, useRef } from "react";

// Input: a ref to an element and a handler. Returns: nothing.
// State: none (a ref keeps the latest handler). Effect: document listeners.
// Cleanup: removes both listeners.
export function useClickOutside(ref, handler) {
  const handlerRef = useRef(handler);

  useEffect(() => {
    handlerRef.current = handler; // always call the newest handler
  }, [handler]);

  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) return;
      handlerRef.current(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref]);
}