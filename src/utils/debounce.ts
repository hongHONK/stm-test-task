function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timerId: ReturnType<typeof setTimeout> | null = null;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    const later = () => {
      timerId = null;
      func.apply(this, args);
    };

    if (timerId) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(later, delay);
  };
}

export default debounce;
