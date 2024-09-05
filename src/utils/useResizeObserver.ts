import { useEffect, useState, RefObject } from "react";

const useResizeObserver = (ref: RefObject<HTMLElement>) => {
  const [dimensions, setDimensions] = useState<{
    width?: number;
    height?: number;
  } | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver((entries) => {
      if (entries.length > 0) {
        const { width, height } = entries[0].contentRect;
        setDimensions({ width, height });
      }
    });

    observer.observe(ref.current as Element);

    return () => {
      observer.unobserve(ref.current as Element);
    };
  }, [ref]);

  return dimensions;
};

export default useResizeObserver;
