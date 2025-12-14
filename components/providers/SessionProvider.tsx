'use client';

import { useEffect } from 'react';
import { useSessionStore } from '@/lib/store/session';

export default function SessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const fetchSessionData = useSessionStore((state) => state.fetchSessionData);
//   const loading = useSessionStore((state) => state.loading);
// 
  useEffect(() => {
    fetchSessionData();
  }, [fetchSessionData]);

//   if (loading) {
//     return <div>Loading...</div>; // Or a spinner component
//   }

  return <>{children}</>;
}
