import { useState, useEffect } from "react";

// Input: storage key and initial value. Returns: [value, setValue] like useState.
// State: the value (read lazily from localStorage once).
// Effect: writes the value on every change. Cleanup: none needed.
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = window.localStorage.getItem(key);
      return saved !== null ? JSON.parse(saved) : initialValue;
    } catch {
      return initialValue; // storage blocked or corrupted JSON
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* storage full or unavailable: keep working in memory */
    }
  }, [key, value]);

  return [value, setValue];
}