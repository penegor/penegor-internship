import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";

export function useApi({ url, params = {}, defaultValue = [] }) {
  const [data, setData] = useState(defaultValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const serializedParams = JSON.stringify(params);

  useEffect(() => {
    let isMounted = true;

    setLoading(true);
    setError(null);

    apiClient
      .get(url, { params: JSON.parse(serializedParams) })
      .then((response) => {
        if (isMounted) {
          setData(response.data);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || "Something went wrong");
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [url, serializedParams]);

  return { data, loading, error };
}
