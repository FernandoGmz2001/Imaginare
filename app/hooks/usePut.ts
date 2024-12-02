import { useState } from "react";
import axios from "axios";

const usePut = (url: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const putData = async (putData: any) => {
    try {
      setIsLoading(true);
      setError(null);
      await axios.put(url, putData);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, putData };
};

export default usePut;

