const express = require('express');

require('dotenv').config()
const app = express();
const port = 3000;
const path = require("node:path")
const assetPath = path.join(__dirname, "public");
const categoryRoutes = require('./routes/categoryRoutes');
const ingredientRoutes = require('./routes/ingredientRoutes');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(assetPath))
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use('/categories', categoryRoutes); 
app.use('/ingredients', ingredientRoutes); 
app.get('/', (req, res) => {
    res.redirect('/categories');
});


app.listen(port, () => {
  console.log(`chez-maymouna listening on port ${port}`);
});
