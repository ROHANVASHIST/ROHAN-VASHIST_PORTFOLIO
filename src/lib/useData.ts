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

export function useDataWithLoading<T>(type: string, fallbackData: T): { data: T; loading: boolean } {
  const [data, setData] = useState<T>(dataCache[type] ?? fallbackData);
  const [loading, setLoading] = useState(!dataCache[type]);

  useEffect(() => {
    let active = true;

    if (dataCache[type]) {
      setData(dataCache[type]);
      setLoading(false);
      return;
    }

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
          setTimeout(() => {
            if (active) setLoading(false);
          }, 600);
        }
      });

    return () => { active = false; };
  }, [type]);

  return { data, loading };
}

