// hooks/useLoading.ts
import { useState, useEffect, useCallback } from 'react';

interface UseLoadingOptions {
  initialLoading?: boolean;
  delay?: number;
  minLoadingTime?: number;
}

export function useLoading(options: UseLoadingOptions = {}) {
  const { 
    initialLoading = true, 
    delay = 0, 
    minLoadingTime = 300 
  } = options;
  
  const [isLoading, setIsLoading] = useState(initialLoading);
  const [startTime] = useState(Date.now());

  const stopLoading = useCallback(() => {
    const elapsed = Date.now() - startTime;
    const remainingTime = Math.max(minLoadingTime - elapsed, 0);
    
    setTimeout(() => {
      setIsLoading(false);
    }, remainingTime);
  }, [startTime, minLoadingTime]);

  const startLoading = useCallback(() => {
    setIsLoading(true);
  }, []);

  useEffect(() => {
    if (delay > 0) {
      const timer = setTimeout(() => {
        if (!isLoading) return;
        setIsLoading(false);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [delay, isLoading]);

  return {
    isLoading,
    setIsLoading,
    startLoading,
    stopLoading,
  };
}