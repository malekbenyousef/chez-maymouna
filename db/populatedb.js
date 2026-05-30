#! /usr/bin/env node

const { Client } = require("pg");

const SQL = `
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT
);

CREATE TABLE ingredients (
  id SERIAL PRIMARY KEY,
  category_id INTEGER REFERENCES categories(id) ON DELETE RESTRICT,
  name VARCHAR(100) NOT NULL,
  quantity_in_stock DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
  unit VARCHAR(20) NOT NULL,
  price_per_unit DECIMAL(10, 2) NOT NULL DEFAULT 0.00
);

INSERT INTO categories (name, description) VALUES
  ('Dairy & Refrigerated', 'Items that must be kept in the walk-in fridge'),
  ('Dry Goods & Baking', 'Flours, sugars, and leavening agents stored in the pantry'),
  ('Fresh Produce', 'Fruits, herbs, and perishable toppings'),
  ('Packaging', 'Boxes, bags, ribbons, and display materials');

INSERT INTO ingredients (category_id, name, quantity_in_stock, unit, price_per_unit) VALUES
  (1, 'Unsalted Butter', 15.00, 'kg', 6.50),
  (1, 'Heavy Cream', 10.00, 'liters', 4.20),
  (2, 'Cake Flour', 50.00, 'kg', 1.80),
  (2, 'Granulated Sugar', 50.00, 'kg', 1.20),
  (2, 'Vanilla Bean Paste', 2.50, 'liters', 45.00),
  (3, 'Fresh Lemons', 30.00, 'pieces', 0.50),
  (4, '10x10 Cake Boxes', 100.00, 'boxes', 0.80);
`;

async function main() {
  console.log("Seeding pastry shop database...");
  
  const client = new Client({
    connectionString: process.argv[2],
  });

  try {
    await client.connect();
    await client.query(SQL);
    console.log("Database seeded successfully!");
  } catch (err) {
    console.error("Error seeding database:", err);
  } finally {
    await client.end();
    console.log("Done.");
  }
}

main();
