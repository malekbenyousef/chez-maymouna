const express = require('express');
const router = express.Router();

const ingredientController = require('../controllers/ingredientController');

router.get('/create', ingredientController.ingredientCreateGet);
router.post('/create', ingredientController.ingredientCreatePost);
router.get('/:id/update',ingredientController.updateIngredientGet);
router.post('/:id/update',ingredientController.updateIngredientPost);
router.post('/:id/delete',ingredientController.ingredientDeletePost)

module.exports = router;
