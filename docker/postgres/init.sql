-- Sales Analytics Dashboard - Database Initialization Script
-- PostgreSQL schema creation

-- Drop existing tables if they exist
DROP TABLE IF EXISTS sales CASCADE;
DROP TABLE IF EXISTS managers CASCADE;
DROP TABLE IF EXISTS prices CASCADE;

-- Managers table (reference data)
CREATE TABLE managers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  city VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Prices table (product catalog with prices)
CREATE TABLE prices (
  id SERIAL PRIMARY KEY,
  product VARCHAR(255) NOT NULL UNIQUE,
  price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sales table (main transactional data)
CREATE TABLE sales (
  id SERIAL PRIMARY KEY,
  order_id VARCHAR(50) NOT NULL,
  date DATE NOT NULL,
  product VARCHAR(255) NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  purchase_type VARCHAR(50),
  payment_method VARCHAR(50),
  manager_id INTEGER,
  city VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  -- Foreign key constraints
  CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES managers(id) ON DELETE SET NULL,
  CONSTRAINT fk_product FOREIGN KEY (product) REFERENCES prices(product) ON DELETE RESTRICT
);

-- Performance indexes
CREATE INDEX idx_sales_date ON sales(date);
CREATE INDEX idx_sales_manager_id ON sales(manager_id);
CREATE INDEX idx_sales_product ON sales(product);
CREATE INDEX idx_sales_order_id ON sales(order_id);
CREATE INDEX idx_managers_name ON managers(name);
CREATE INDEX idx_managers_city ON managers(city);
CREATE INDEX idx_prices_product ON prices(product);

-- Composite index for date range queries with manager filter
CREATE INDEX idx_sales_date_manager ON sales(date, manager_id);

-- Function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for automatic updated_at updates
CREATE TRIGGER update_sales_updated_at
    BEFORE UPDATE ON sales
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_managers_updated_at
    BEFORE UPDATE ON managers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_prices_updated_at
    BEFORE UPDATE ON prices
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Table comments
COMMENT ON TABLE managers IS 'Sales managers reference table';
COMMENT ON TABLE prices IS 'Product catalog with prices';
COMMENT ON TABLE sales IS 'Main sales transactions table';

-- Column comments for sales table
COMMENT ON COLUMN sales.order_id IS 'Unique order identifier';
COMMENT ON COLUMN sales.date IS 'Order date';
COMMENT ON COLUMN sales.product IS 'Product name';
COMMENT ON COLUMN sales.quantity IS 'Quantity of items in order';
COMMENT ON COLUMN sales.purchase_type IS 'Purchase type (wholesale/retail)';
COMMENT ON COLUMN sales.payment_method IS 'Payment method';
COMMENT ON COLUMN sales.manager_id IS 'Manager ID (FK to managers)';
COMMENT ON COLUMN sales.city IS 'City where sale was made';

