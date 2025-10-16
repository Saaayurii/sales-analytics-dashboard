import { getRedisClient } from './client';
import type { DashboardFilters, AnalyticsData } from '@/types';

// Generate cache key from filters
export const getCacheKey = (prefix: string, filters: DashboardFilters): string => {
  const parts = [prefix];
  
  filters.manager_id ? parts.push(`mgr:${filters.manager_id}`) : null;
  filters.period ? parts.push(`per:${filters.period}`) : null;
  filters.category ? parts.push(`cat:${filters.category}`) : null;
  
  return parts.join(':');
};

// Cache analytics data
export const cacheAnalytics = (
  filters: DashboardFilters,
  data: AnalyticsData,
  ttl = 300
): Promise<void> => {
  const key = getCacheKey('analytics', filters);
  
  return getRedisClient()
    .then((client) => {
      return client.set(key, JSON.stringify(data), {
        EX: ttl,
      });
    })
    .then(() => undefined)
    .catch((error) => {
      console.error('Cache set error:', error);
    });
};

// Get cached analytics data
export const getCachedAnalytics = (
  filters: DashboardFilters
): Promise<AnalyticsData | null> => {
  const key = getCacheKey('analytics', filters);
  
  return getRedisClient()
    .then((client) => client.get(key))
    .then((data) => (data ? JSON.parse(data) as AnalyticsData : null))
    .catch((error) => {
      console.error('Cache get error:', error);
      return null;
    });
};

// Invalidate all analytics caches
export const invalidateAnalyticsCache = (): Promise<void> => {
  return getRedisClient()
    .then((client) => {
      return client.keys('analytics:*')
        .then((keys) => {
          return keys.length > 0 
            ? client.del(keys)
            : Promise.resolve(0);
        });
    })
    .then(() => undefined)
    .catch((error) => {
      console.error('Cache invalidation error:', error);
    });
};

// Cache managers list
export const cacheManagers = (managers: unknown[], ttl = 3600): Promise<void> => {
  return getRedisClient()
    .then((client) => {
      return client.set('managers:list', JSON.stringify(managers), {
        EX: ttl,
      });
    })
    .then(() => undefined)
    .catch((error) => {
      console.error('Cache managers error:', error);
    });
};

// Get cached managers
export const getCachedManagers = (): Promise<unknown[] | null> => {
  return getRedisClient()
    .then((client) => client.get('managers:list'))
    .then((data) => (data ? JSON.parse(data) as unknown[] : null))
    .catch((error) => {
      console.error('Get cached managers error:', error);
      return null;
    });
};
