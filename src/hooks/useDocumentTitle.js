import { useEffect } from "react";

// Input: a title string. Returns: nothing.
// State: none. Effect: sets document.title. Cleanup: restores the old title.
export function useDocumentTitle(title) {
  useEffect(() => {
    const previous = document.title;
    document.title = title;
    return () => {
      document.title = previous;
    };
  }, [title]);
}