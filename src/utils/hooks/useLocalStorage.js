/*global chrome*/
import { useCallback, useEffect, useState } from 'react';

export function useLocalStorage(datakey, defaultValue) {
  const [dataState, setDataState] = useState(defaultValue);
  useEffect(() => {
    async function setDataFromStorage() {
      const fetched =
        (await chrome.storage.local.get([datakey]))[datakey] || defaultValue;
      setDataState(fetched);
    }
    setDataFromStorage();
  }, [datakey, defaultValue]);

  const setData = useCallback(
    (data) => {
      setDataState(data);
      chrome.storage.local.set({ [datakey]: data });
    },
    [datakey]
  );

  return { data: dataState, setData };
}
