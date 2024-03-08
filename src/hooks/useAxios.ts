import { useState, useEffect } from "react";
import axios from "axios";

type Response<T> = [T | null];

export function useAxios<T = any>(url: string): Response<T> {
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get<T>(url);
      setData(response.data);
    };

    fetchData();
  }, [url]);

  return [data];
}
