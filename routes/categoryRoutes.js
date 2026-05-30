const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/categoryController');

router.get('/', categoryController.categoryList);
router.get('/create', categoryController.categoryCreateGet);
router.post('/create', categoryController.categoryCreatePost);
router.get('/:id', categoryController.categoryDetail);
router.get('/:id/update',categoryController.updateCategoryGet);
router.post('/:id/update',categoryController.updateCategoryPost);
router.get('/:id/delete',categoryController.categoryDeleteGet);
router.post('/:id/delete',categoryController.categoryDeletePost)

module.exports = router;
