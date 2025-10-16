import { Pool } from 'pg';

// PostgreSQL connection pool configuration
const createPool = (): Pool => {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 20, // Maximum number of clients in the pool
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  });

  // Handle pool errors
  pool.on('error', (err) => {
    console.error('Unexpected error on idle PostgreSQL client', err);
  });

  return pool;
};

// Singleton pool instance
let pool: Pool | null = null;

export const getPool = (): Pool => {
  return pool ? pool : (pool = createPool());
};

// Query helper with Promise-based approach
export const query = <T = unknown>(
  text: string,
  params?: unknown[]
): Promise<T[]> => {
  return getPool()
    .query(text, params)
    .then((result) => result.rows as T[])
    .catch((error) => {
      console.error('Database query error:', error);
      throw error;
    });
};

// Transaction helper
export const transaction = <T>(
  callback: (client: Pool) => Promise<T>
): Promise<T> => {
  const pool = getPool();
  
  return pool
    .query('BEGIN')
    .then(() => callback(pool))
    .then((result) => {
      return pool.query('COMMIT').then(() => result);
    })
    .catch((error) => {
      return pool.query('ROLLBACK').then(() => {
        throw error;
      });
    });
};

// Close pool connection
export const closePool = (): Promise<void> => {
  return pool
    ? pool.end().then(() => {
        pool = null;
      })
    : Promise.resolve();
};
