-- Create database schema for food expiry tracking system
CREATE TABLE IF NOT EXISTS food_items (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  barcode VARCHAR(50),
  purchase_date DATE NOT NULL,
  expiry_date DATE NOT NULL,
  quantity INTEGER DEFAULT 1,
  unit VARCHAR(20) DEFAULT 'piece',
  location VARCHAR(100) DEFAULT 'pantry',
  status VARCHAR(20) DEFAULT 'safe',
  image_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS waste_log (
  id SERIAL PRIMARY KEY,
  food_item_id INTEGER REFERENCES food_items(id),
  action VARCHAR(20) NOT NULL, -- 'consumed', 'wasted', 'donated'
  quantity INTEGER NOT NULL,
  date DATE NOT NULL,
  reason TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_achievements (
  id SERIAL PRIMARY KEY,
  achievement_type VARCHAR(50) NOT NULL,
  achievement_name VARCHAR(100) NOT NULL,
  earned_date DATE NOT NULL,
  streak_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS sustainability_metrics (
  id SERIAL PRIMARY KEY,
  month INTEGER NOT NULL,
  year INTEGER NOT NULL,
  food_saved_kg DECIMAL(10,2) DEFAULT 0,
  co2_reduced_kg DECIMAL(10,2) DEFAULT 0,
  money_saved DECIMAL(10,2) DEFAULT 0,
  waste_prevented_items INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(month, year)
);

-- Insert sample data for demonstration
INSERT INTO food_items (name, category, purchase_date, expiry_date, quantity, unit, location, status) VALUES
('Organic Milk', 'Dairy', '2024-01-15', '2024-01-22', 1, 'liter', 'refrigerator', 'warning'),
('Whole Wheat Bread', 'Bakery', '2024-01-14', '2024-01-18', 1, 'loaf', 'pantry', 'expired'),
('Fresh Spinach', 'Vegetables', '2024-01-16', '2024-01-25', 200, 'grams', 'refrigerator', 'safe'),
('Greek Yogurt', 'Dairy', '2024-01-13', '2024-01-20', 4, 'cups', 'refrigerator', 'warning'),
('Bananas', 'Fruits', '2024-01-15', '2024-01-23', 6, 'pieces', 'counter', 'safe'),
('Chicken Breast', 'Meat', '2024-01-16', '2024-01-19', 500, 'grams', 'freezer', 'warning'),
('Tomatoes', 'Vegetables', '2024-01-14', '2024-01-21', 4, 'pieces', 'counter', 'safe'),
('Cheddar Cheese', 'Dairy', '2024-01-12', '2024-01-17', 200, 'grams', 'refrigerator', 'expired');

INSERT INTO waste_log (food_item_id, action, quantity, date, reason) VALUES
(1, 'consumed', 1, '2024-01-16', 'Used in smoothie'),
(3, 'consumed', 100, '2024-01-17', 'Made salad'),
(5, 'consumed', 2, '2024-01-16', 'Breakfast'),
(2, 'wasted', 1, '2024-01-18', 'Moldy'),
(8, 'wasted', 100, '2024-01-17', 'Expired');

INSERT INTO user_achievements (achievement_type, achievement_name, earned_date, streak_count) VALUES
('streak', 'Zero Waste Week', '2024-01-14', 1),
('milestone', 'First Recipe Suggestion Used', '2024-01-15', 0),
('environmental', 'CO2 Saver', '2024-01-16', 0);

INSERT INTO sustainability_metrics (month, year, food_saved_kg, co2_reduced_kg, money_saved, waste_prevented_items) VALUES
(1, 2024, 2.5, 1.2, 15.50, 8);
