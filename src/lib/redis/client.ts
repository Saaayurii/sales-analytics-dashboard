import { createClient } from 'redis';

type RedisClient = ReturnType<typeof createClient>;

let client: RedisClient | null = null;

// Create Redis client
export const getRedisClient = (): Promise<RedisClient> => {
  return client && client.isOpen
    ? Promise.resolve(client)
    : (() => {
        const newClient = createClient({
          url: process.env.REDIS_URL || 'redis://localhost:6379',
          password: process.env.REDIS_PASSWORD || undefined,
        });

        newClient.on('error', (err) => {
          console.error('Redis Client Error:', err);
        });

        return newClient
          .connect()
          .then(() => {
            client = newClient;
            return newClient;
          })
          .catch((error) => {
            console.error('Failed to connect to Redis:', error);
            throw error;
          });
      })();
};

// Close Redis connection
export const closeRedisClient = (): Promise<void> => {
  return client && client.isOpen
    ? client.quit().then(() => {
        client = null;
      })
    : Promise.resolve();
};
