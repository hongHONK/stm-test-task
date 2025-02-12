import { useRef, useCallback } from "react";

function useDebounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  debounce: number
) {
  const timerId = useRef<ReturnType<typeof setTimeout> | null>(null);

  return useCallback(
    (...args: Parameters<T>) => {
      const later = () => {
        timerId.current = null;
        func(...args);
      };

      if (timerId.current) {
        clearTimeout(timerId.current);
      }

      timerId.current = setTimeout(later, debounce);
    },
    [func, debounce]
  );
}

export default useDebounce;
