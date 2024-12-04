import { useState, useCallback } from "react";
import axios from "axios";

const useFetch = <T>(initialUrl: string) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (params?: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await axios.get(`${initialUrl}${params}`);
      if (response.status < 200 || response.status >= 300) {
        throw new Error("Could not fetch the data for that resource");
      }
      setData(response.data);
      console.log(response.data)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  }, [initialUrl]);

  return { data, isLoading, error, fetchData };
};

export default useFetch;

