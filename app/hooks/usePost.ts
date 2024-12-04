import { useState } from "react";
import axios from "axios";

const usePost = (url: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [responseData, setResponseData] = useState<any | null>(null);

  const postData = async (postData: any) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await axios.post(url, postData);
      if (response.status >= 200 && response.status < 300) {
        setResponseData(response.data);
      } else {
        setError(`Request failed with status code ${response.status}`);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, responseData, postData };
};

export default usePost;
