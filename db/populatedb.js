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
  ('Produits Laitiers & Frais', 'Articles devant être conservés au réfrigérateur'),
  ('Produits Secs & Pâtisserie', 'Farines, sucres et poudres levantes stockés dans le garde-manger'),
  ('Produits Frais', 'Fruits, herbes et garnitures périssables'),
  ('Emballages', 'Boîtes, sacs, rubans et matériels de présentation');

INSERT INTO ingredients (category_id, name, quantity_in_stock, unit, price_per_unit) VALUES
  (1, 'Beurre Doux', 15.00, 'kg', 6.50),
  (1, 'Crème Liquide Entière', 10.00, 'litres', 4.20),
  (2, 'Farine T45', 50.00, 'kg', 1.80),
  (2, 'Sucre en Poudre', 50.00, 'kg', 1.20),
  (2, 'Pâte de Vanille', 2.50, 'litres', 45.00),
  (3, 'Citrons Frais', 30.00, 'pieces', 0.50),
  (4, 'Boîtes à Gâteaux 25x25cm', 100.00, 'boites', 0.80);
`;

async function main() {
  console.log("Peuplement de la base de données de la pâtisserie...");
  
  const client = new Client({
    connectionString: process.argv[2],
  });

  try {
    await client.connect();
    await client.query(SQL);
    console.log("Base de données peuplée avec succès !");
  } catch (err) {
    console.error("Erreur lors du peuplement de la base de données :", err);
  } finally {
    await client.end();
    console.log("Terminé.");
  }
}

main();
