/*global chrome*/
import { useEffect, useState } from 'react';

export function useLocalStorage(datakey, defaultValue) {
  const [dataState, setDataState] = useState();
  useEffect(() => {
    async function setDataFromStorage() {
      const fetched =
        (await chrome.storage.local.get([datakey]))[datakey] || defaultValue;
      setDataState(fetched);
    }
    setDataFromStorage();
  }, []);

  function setData(data) {
    setDataState(data);
    chrome.storage.local.set({ [datakey]: data });
  }

  return { data: dataState, setData };
}
