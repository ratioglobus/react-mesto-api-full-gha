import { useCallback, useEffect } from 'react';

export default function HandleEscClose(handleClose) {
  const HandleEscClose = useCallback(
    event => {
      if (event.key === 'Escape') {
        handleClose();
      }
    },
    [handleClose]
  );

  useEffect(() => {
    document.addEventListener('keyup', HandleEscClose, false);

    return () => {
      document.removeEventListener('keyup', HandleEscClose, false);
    };
  }, [HandleEscClose]);
};
