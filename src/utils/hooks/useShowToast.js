import { useState } from 'react';

export function useShowToast(initialState = false, timeout = 3000) {
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
