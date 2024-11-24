'use client';

import { useEffect } from 'react';

const usePageTitle = (title) => {
  useEffect(() => {
    if (title) {
      document.title = `${title} | Globalie`;
    } else {
      document.title = 'Globalie';
    }
  }, [title]);
};

export default usePageTitle;