/*global chrome*/
import { useCallback, useEffect, useState } from 'react';

const getDefaultValue = (type) => {
  switch (type) {
    case 'string':
      return '';
    case 'object':
      return {};
    case 'array':
      return [];
    default:
      return {};
  }
};

export function useLocalStorage(
  datakey,
  type = 'string',
  idFun = (item) => item // useful for array type
) {
  const [dataState, setDataState] = useState(getDefaultValue(type));

  useEffect(() => {
    async function setDataFromStorage() {
      const fetched =
        (await chrome.storage.local.get([datakey]))[datakey] ||
        getDefaultValue(type);
      setDataState(fetched);
    }
    setDataFromStorage();
  }, [datakey, type]);

  const setData = useCallback(
    (data) => {
      setDataState(data);
      chrome.storage.local.set({ [datakey]: data });
    },
    [datakey]
  );

  const deleteData = useCallback(
    (id) => {
      const newState = dataState.filter((item) => idFun(item) !== id);
      setDataState(newState);
      chrome.storage.local.set({ [datakey]: newState });
    },
    [idFun, datakey, dataState]
  );

  const addData = useCallback(
    (data) => {
      const newState = [...dataState, data];
      setDataState(newState);
      chrome.storage.local.set({ [datakey]: newState });
    },
    [dataState, datakey]
  );

  return { data: dataState, setData, deleteData, addData };
}
