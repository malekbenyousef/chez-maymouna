const db = require('../db/queries.js');
async function categoryList(req,res){
    const categories = await db.getCategories();
    res.render("index", { title: "chez-maymouna", categories: categories })

}
async function categoryCreateGet(req,res){

    res.render("categoryCreate", { title: "create-category"})
}

async function categoryCreatePost(req, res) {
    try {
        const { name, description } = req.body;
        
        await db.addCategories(name, description);
        
        res.redirect('/categories'); 
        
    } catch (error) {
        console.error("Error adding category:", error);
        
        res.status(500).send("Erreur lors de la création de la catégorie.");
    }
}

async function categoryDetail(req, res) {
    try {
        const categoryId = req.params.id;
        
        const category = await db.getCategoryById(categoryId);
        const ingredients = await db.getIngredientsByCategory(categoryId);
        
        if (!category) {
            return res.status(404).send("Catégorie introuvable");
        }

        res.render("categoryDetail", { 
            title: `Détails - ${category.name}`, 
            category: category,
            ingredients: ingredients 
        });

    } catch (error) {
        console.error("Error fetching category details:", error);
        res.status(500).send("Erreur serveur");
    }
}
async function updateCategoryGet(req, res) {
    try {
        const categoryId = req.params.id;
        const category = await db.getCategoryById(categoryId);

        if (!category) {
            return res.status(404).send("Catégorie introuvable");
        }

        res.render("updateCategory", { 
            title: `Mise à jour - ${category.name}`,
            category: category 
        });

    } catch (error) {
        console.error("Error fetching category for update:", error);
        res.status(500).send("Erreur lors de la récupération de la catégorie.");
    }
}
async function updateCategoryPost(req,res){

    try {
        const id = req.params.id;
        const { name, description } = req.body;
        
        await db.updateCategory(id,name, description);
        
        res.redirect(`/categories/${id}`);
        
    } catch (error) {
        console.error("Error updating category:", error);
        
        res.status(500).send("Erreur lors de la mise a jour de la catégorie.");
    }
}
async function categoryDeleteGet(req, res) {
    try {
        const id = req.params.id;
        
        const category = await db.getCategoryById(id);
        const ingredients = await db.getIngredientsByCategory(id);

        if (!category) {
            return res.status(404).send("Catégorie introuvable");
        }

        res.render("categoryDelete", {
            title: `Supprimer - ${category.name}`,
            category: category,
            hasIngredients: ingredients.length > 0 
        });

    } catch (error) {
        console.error("Error loading delete page:", error);
        res.status(500).send("Erreur serveur.");
    }
}
async function categoryDeletePost(req, res) {
    try {
        const id = req.params.id;
        
        const ingredients = await db.getIngredientsByCategory(id);
        
        if (ingredients.length > 0) {
            return res.status(400).send("Action refusée : Cette catégorie contient encore des ingrédients.");
        }

        await db.deleteCategory(id);
        
        res.redirect('/categories');

    } catch (error) {
        console.error("Error deleting category:", error);
        res.status(500).send("Erreur lors de la suppression de la catégorie.");
    }
}
module.exports={
    categoryList,
    categoryCreateGet,
    categoryCreatePost,
    categoryDetail,
    updateCategoryGet,
    updateCategoryPost,
    categoryDeleteGet,
    categoryDeletePost,

}
