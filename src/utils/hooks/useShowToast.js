import { useState } from 'react';

export function useShowToast(initialState, timeout) {
  const [show, setShow] = useState(initialState);

  function showToast() {
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, timeout);
  }

  return {
    show,
    showToast,
  };
}
