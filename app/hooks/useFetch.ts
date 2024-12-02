import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData<T>() {
      try {
        setIsLoading(true);
        setError(null);
        const response = axios.get(url);
        if (!response.ok) {
          setError("Could not fetch the data for that resource");
        }
        const data: T = await response.data;
        return data;
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [url]);
  return { data, isLoading, error };
};
export default useFetch;
