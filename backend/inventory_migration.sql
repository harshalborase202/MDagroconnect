-- =============================================================
--  MD Agro Connect — Inventory Migration
--  Run this on an EXISTING database to add inventory columns.
--  Safe to run multiple times (uses IF NOT EXISTS / IF EXISTS).
-- =============================================================

USE mdagroconnect;

-- 1. Add stock_quantity column to products (if missing)
ALTER TABLE products 
  ADD COLUMN IF NOT EXISTS stock_quantity INT UNSIGNED NOT NULL DEFAULT 0;

-- 2. Add low_stock_threshold column to products (if missing)  
ALTER TABLE products 
  ADD COLUMN IF NOT EXISTS low_stock_threshold INT UNSIGNED NOT NULL DEFAULT 10;

-- 3. Create inventory_logs table (if missing)
CREATE TABLE IF NOT EXISTS inventory_logs (
  id              INT UNSIGNED   NOT NULL AUTO_INCREMENT,
  product_id      VARCHAR(10)    NOT NULL,
  change_type     VARCHAR(20)    NOT NULL,
  quantity_change INT            NOT NULL,
  quantity_after  INT            NOT NULL DEFAULT 0,
  reference_id    VARCHAR(50)    DEFAULT NULL,
  note            VARCHAR(255)   DEFAULT NULL,
  created_by      VARCHAR(60)    NOT NULL DEFAULT 'system',
  created_at      TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_inv_product (product_id),
  INDEX idx_inv_created (created_at),
  CONSTRAINT fk_inv_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 4. Seed default stock quantities (set a sensible default for existing products)
-- You can adjust these or update per product afterwards.
UPDATE products SET stock_quantity = 50, low_stock_threshold = 10 WHERE stock_quantity = 0;

SELECT 
    id, name, stock_quantity, low_stock_threshold,
    CASE 
        WHEN stock_quantity = 0                              THEN 'OUT OF STOCK'
        WHEN stock_quantity <= low_stock_threshold           THEN 'LOW STOCK'
        ELSE 'IN STOCK'
    END AS inventory_status
FROM products
ORDER BY category, id;

