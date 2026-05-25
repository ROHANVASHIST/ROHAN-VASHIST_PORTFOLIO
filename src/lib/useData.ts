import { useState, useEffect } from 'react';

// Cache for in-memory data
const dataCache: Record<string, any> = {};

export function useData<T>(type: string, initialBundledData: T): T {
  const [data, setData] = useState<T>(dataCache[type] || initialBundledData);

  useEffect(() => {
    let active = true;
    if (!dataCache[type]) {
      fetch(`/api/data/${type}`)
        .then(res => res.json())
        .then(json => {
          if (active && json && !json.error) {
            dataCache[type] = json;
            setData(json as T);
          }
        })
        .catch(err => console.error('Failed to fetch data', err));
    }
    return () => { active = false; };
  }, [type]);

  return data;
}

export function useDataWithLoading<T>(type: string, initialBundledData: T): { data: T; loading: boolean } {
  const [data, setData] = useState<T>(dataCache[type] || initialBundledData);
  const [loading, setLoading] = useState(!dataCache[type]);

  useEffect(() => {
    let active = true;
    if (!dataCache[type]) {
      setLoading(true);
      fetch(`/api/data/${type}`)
        .then(res => res.json())
        .then(json => {
          if (active && json && !json.error) {
            dataCache[type] = json;
            setData(json as T);
          }
        })
        .catch(err => console.error('Failed to fetch data', err))
        .finally(() => {
          if (active) {
            // Artificial delay to exhibit smooth skeleton fade animation details beautifully
            setTimeout(() => {
              if (active) setLoading(false);
            }, 600);
          }
        });
    } else {
      setLoading(false);
    }
    return () => { active = false; };
  }, [type]);

  return { data, loading };
}

