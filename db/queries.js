
const pool = require("./pool");
async function getCategories() {
  const { rows } = await pool.query("SELECT * FROM categories");
  return rows;
}
async function addCategories(name, description) {
    await pool.query(
        `INSERT INTO categories (name, description) VALUES ($1, $2)`, 
        [name, description] 
    );
}

async function getCategoryById(id) {
    const { rows } = await pool.query(
        `SELECT * FROM categories WHERE id = $1`, 
        [id]
    );
    return rows[0]; 
}

async function getIngredientsByCategory(categoryId) {
    const { rows } = await pool.query(
        `SELECT * FROM ingredients WHERE category_id = $1`, 
        [categoryId]
    );
    return rows;
}


async function updateCategory(id, name, description) {
    await pool.query(
        `UPDATE categories 
         SET name = $1, description = $2 
         WHERE id = $3`, 
        [name, description, id]
    );
}
async function deleteCategory(id) {
    await pool.query(
        `DELETE FROM categories WHERE id = $1`, 
        [id]
    );
}
async function createIngredient(categoryId, name, quantity, unit, price) {
    await pool.query(
        `INSERT INTO ingredients (category_id, name, quantity_in_stock, unit, price_per_unit) 
         VALUES ($1, $2, $3, $4, $5)`, 
        [categoryId, name, quantity, unit, price] 
    );
}

async function getIngredientById(ingredientId) {
    const { rows } = await pool.query(
        `SELECT * FROM ingredients WHERE id = $1`, 
        [ingredientId]
    );
    return rows[0]; 
}

async function updateIngredient(id, name, quantity, unit, price) {
    await pool.query(
        `UPDATE ingredients 
         SET name = $1, quantity_in_stock = $2, unit = $3, price_per_unit = $4 
         WHERE id = $5`, 
        [ name, quantity, unit, price,id] 
    );
}

async function deleteIngredient(id) {
    await pool.query(
        `DELETE FROM ingredients WHERE id = $1`, 
        [id]
    );
}

module.exports={
    getCategories,
    addCategories,
    getCategoryById,
    getIngredientsByCategory,
    updateCategory,
    deleteCategory,
    createIngredient,
    getIngredientById,
    updateIngredient,
    deleteIngredient,

}
