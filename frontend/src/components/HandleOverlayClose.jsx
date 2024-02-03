import { useCallback, useEffect } from 'react';
import { CONFIG } from '../utils/const.js';

export default function HandleOverlayClose(handleClose) {
  const HandleOverlayClose = useCallback(
    event => {
      if (event.target.classList.contains(CONFIG.popupOpened)) {
        handleClose();
      }
    },
    [handleClose]
  );

  useEffect(() => {
    document.addEventListener('mousedown', HandleOverlayClose);

    return () => {
      document.removeEventListener('mousedown', HandleOverlayClose);
    };
  }, [HandleOverlayClose]);
}
