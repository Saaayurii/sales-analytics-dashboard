'use server';

import { getAllManagers } from '@/lib/db/queries';
import { getCachedManagers, cacheManagers } from '@/lib/redis/cache';
import type { Manager } from '@/types';

// Server Action требует async, но используем Promise-based подход внутри
export const getManagers = async (): Promise<Manager[]> => {
  return getCachedManagers()
    .then((cached) =>
      cached
        ? Promise.resolve(cached as Manager[])
        : getAllManagers()
            .then((managers) => {
              return cacheManagers(managers).then(() => managers);
            })
    )
    .catch((error) => {
      console.error('Get managers error:', error);
      return [];
    });
};
