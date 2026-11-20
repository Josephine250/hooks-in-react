import { useState, useEffect } from "react";

// Input: a key name such as "Escape" or "k". Returns: true while it is held down.
// State: boolean. Effect: keydown + keyup listeners. Cleanup: removes both.
export function useKeyPress(targetKey) {
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const down = (e) => e.key === targetKey && setPressed(true);
    const up = (e) => e.key === targetKey && setPressed(false);
    const reset = () => setPressed(false); // key released while tab was unfocused
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    window.addEventListener("blur", reset);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      window.removeEventListener("blur", reset);
    };
  }, [targetKey]);

  return pressed;
}