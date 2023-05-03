import { useEffect, useState } from "react";
import { clearTimeout } from "timers";

interface DebounceItem<T> {
  value: T;
  delay: number;
}

/*attraverso questo useDebounce è possibile settare un tempo massimo di fetch di API, dopo il quale interrompere la ricerca*/
function useDebounce<T>({ value, delay }: DebounceItem<T>): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
