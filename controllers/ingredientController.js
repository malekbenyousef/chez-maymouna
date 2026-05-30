const db = require('../db/queries.js');
async function ingredientCreateGet(req, res) {
    try {
        const categories = await db.getCategories();
        
        const selectedCategoryId = req.query.category || null;

        res.render("ingredientCreate", { 
            title: "Ajouter un ingrédient",
            categories: categories,
            selectedCategoryId: selectedCategoryId
        });
    } catch (error) {
        console.error("Erreur GET creation ingredient:", error);
        res.status(500).send("Erreur serveur");
    }
}

async function ingredientCreatePost(req, res) {
    try {

        const { categoryId, name, quantity, unit, price } = req.body;
        
        await db.createIngredient(categoryId, name, quantity, unit, price);
        
        res.redirect(`/categories/${categoryId}`);
        
    } catch (error) {
        console.error("Error adding ingredient:", error);
        res.status(500).send("Erreur lors de la création de l'ingrédient.");
    }
}

async function updateIngredientGet(req, res) {
    try {
        const ingredientId = req.params.id;
        const ingredient = await db.getIngredientById(ingredientId);

        if (!ingredient) {
            return res.status(404).send("Ingrédient introuvable");
        }

        res.render("updateIngredient", { 
            title: `Mise à jour - ${ingredient.name}`,
            ingredient: ingredient 
        });

    } catch (error) {
        console.error("Error fetching ingredient for update:", error);
        res.status(500).send("Erreur lors de la récupération de l'ingrédient.");
    }
}

async function updateIngredientPost(req, res) {
    try {
        const id = req.params.id;
        
        const { categoryId, name, quantity, unit, price } = req.body; 
        
        await db.updateIngredient(id, name, quantity, unit, price);
        
        res.redirect(`/categories/${categoryId}`); 
        
    } catch (error) {
        console.error("Error updating ingredient:", error);
        res.status(500).send("Erreur lors de la mise à jour de l'ingrédient.");
    }
}
async function ingredientDeletePost(req, res) {
    try {
        const id = req.params.id; 
        
        const categoryId = req.body.categoryId; 

        await db.deleteIngredient(id);
        
        res.redirect(`/categories/${categoryId}`);

    } catch (error) {
        console.error("Error deleting ingredient:", error);
        res.status(500).send("Erreur lors de la suppression de l'ingrédient.");
    }
}
module.exports={
    ingredientCreateGet,
    ingredientCreatePost,
    ingredientDeletePost,
    updateIngredientGet,
    updateIngredientPost,

}
