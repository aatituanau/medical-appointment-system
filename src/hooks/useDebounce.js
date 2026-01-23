import {useState, useEffect} from "react";

// This hook delays the update of a value
export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cancel the timeout if value changes before delay finishes
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}
