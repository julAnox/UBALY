
ALTER TABLE store_order ADD COLUMN patronymic VARCHAR(100) DEFAULT '' NOT NULL;
ALTER TABLE store_order ADD COLUMN delivery_region VARCHAR(20) DEFAULT 'minsk' NOT NULL;
ALTER TABLE store_order ADD COLUMN delivery_method VARCHAR(20) DEFAULT 'pickup' NOT NULL;
ALTER TABLE store_order ADD COLUMN delivery_address TEXT DEFAULT '' NOT NULL;
ALTER TABLE store_order ADD COLUMN europochta_branch VARCHAR(100) DEFAULT '' NOT NULL;
ALTER TABLE store_order ADD COLUMN approved BOOLEAN DEFAULT FALSE NOT NULL;
ALTER TABLE store_order ADD COLUMN updated_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL;

ALTER TABLE store_order MODIFY contact_method VARCHAR(20) NULL;
ALTER TABLE store_order MODIFY contact_id VARCHAR(200) DEFAULT '' NOT NULL;

CREATE INDEX idx_order_approved ON store_order(approved);
CREATE INDEX idx_order_delivery_region ON store_order(delivery_region);
