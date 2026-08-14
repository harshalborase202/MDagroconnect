-- =============================================================
--  MD Agro Connect — MySQL Database Schema (MySQL 5.5 compatible)
--  Run: Get-Content schema.sql | mysql -u root -pPASSWORD
-- =============================================================

CREATE DATABASE IF NOT EXISTS mdagroconnect
  CHARACTER SET utf8
  COLLATE utf8_unicode_ci;

USE mdagroconnect;

-- -------------------------------------------------------------
-- 1. products
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS products (
  id          VARCHAR(10)    NOT NULL,
  name        VARCHAR(200)   NOT NULL,
  category    VARCHAR(20)    NOT NULL,
  price       DECIMAL(10,2)  NOT NULL,
  unit        VARCHAR(60)    NOT NULL,
  rating      DECIMAL(3,1)   NOT NULL DEFAULT 0.0,
  reviews     INT UNSIGNED   NOT NULL DEFAULT 0,
  description TEXT           NOT NULL,
  image       VARCHAR(60)    NOT NULL,
  tags        TEXT           NOT NULL,
  in_stock    TINYINT(1)     NOT NULL DEFAULT 1,
  created_at  TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- -------------------------------------------------------------
-- 2. orders
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS orders (
  id              INT UNSIGNED   NOT NULL AUTO_INCREMENT,
  customer_name   VARCHAR(120)   NOT NULL,
  phone           VARCHAR(20)    NOT NULL,
  address         TEXT           NOT NULL,
  total_amount    DECIMAL(12,2)  NOT NULL,
  status          VARCHAR(20)    NOT NULL DEFAULT 'pending',
  notes           TEXT,
  created_at      TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- -------------------------------------------------------------
-- 3. order_items  (line_total stored as plain column, computed in app)
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS order_items (
  id            INT UNSIGNED   NOT NULL AUTO_INCREMENT,
  order_id      INT UNSIGNED   NOT NULL,
  product_id    VARCHAR(10)    NOT NULL,
  product_name  VARCHAR(200)   NOT NULL,
  unit_price    DECIMAL(10,2)  NOT NULL,
  quantity      INT UNSIGNED   NOT NULL DEFAULT 1,
  line_total    DECIMAL(12,2)  NOT NULL DEFAULT 0.00,
  PRIMARY KEY (id),
  CONSTRAINT fk_oi_order   FOREIGN KEY (order_id)   REFERENCES orders(id)   ON DELETE CASCADE,
  CONSTRAINT fk_oi_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- -------------------------------------------------------------
-- 4. contact_messages
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS contact_messages (
  id          INT UNSIGNED   NOT NULL AUTO_INCREMENT,
  name        VARCHAR(120)   NOT NULL,
  email       VARCHAR(180)   NOT NULL,
  phone       VARCHAR(20),
  message     TEXT           NOT NULL,
  is_read     TINYINT(1)     NOT NULL DEFAULT 0,
  created_at  TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- -------------------------------------------------------------
-- 5. newsletter_subscribers
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id            INT UNSIGNED   NOT NULL AUTO_INCREMENT,
  email         VARCHAR(180)   NOT NULL,
  is_active     TINYINT(1)     NOT NULL DEFAULT 1,
  subscribed_at TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_newsletter_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- -------------------------------------------------------------
-- 6. advisory_logs
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS advisory_logs (
  id          INT UNSIGNED   NOT NULL AUTO_INCREMENT,
  crop        VARCHAR(60)    NOT NULL,
  issue       VARCHAR(60)    NOT NULL,
  created_at  TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_advisory_crop  (crop),
  INDEX idx_advisory_issue (issue)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
