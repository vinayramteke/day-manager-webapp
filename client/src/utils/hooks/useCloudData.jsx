import { useState, useMemo, useEffect, useRef } from "react";
import apiCall from "../../api";
const useCloudData = (user, token) => {
  const [data, setData] = useState({ activities: [], tasks: [], budget: 24 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const isFirstLoad = useRef(true);

  // Load data
  useEffect(() => {
    if (user && token) {
      setLoading(true);
      apiCall("/data", "GET", null, token)
        .then((fetchedData) => {
          if (fetchedData) {
            setData({
              activities: fetchedData.activities || [],
              tasks: fetchedData.tasks || [],
              budget: fetchedData.budget || 24,
            });
          }
          isFirstLoad.current = false;
        })
        .catch((err) => setError("Could not connect to server."))
        .finally(() => setLoading(false));
    }
  }, [user, token]);

  // Auto-save (Debounced)
  useEffect(() => {
    if (!user || !token || isFirstLoad.current) return;
    const timeoutId = setTimeout(() => {
      apiCall("/data", "POST", data, token).catch((e) => console.error(e));
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [data, user, token]);

  return [data, setData, loading, error];
};

export default useCloudData;
