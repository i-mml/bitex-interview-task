import { useEffect, useState } from "react";

interface FetchParameters<T> {
  fetchFn: () => Promise<T>;
}

const useFetch = <T>({ fetchFn }: FetchParameters<T>) => {
  const [data, setData] = useState<Awaited<T>>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetchFn();
        setData(response);
      } catch {
        setError("Failed to fetch tasks. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  return { data, loading, error };
};

export default useFetch;
