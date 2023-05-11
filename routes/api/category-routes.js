const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categories = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categories = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!categories) {
      res.status(404).json({ message: "Category is not found with that id!" });
      return;
    }
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  // create a new category
  try {
    const categories = await Category.create(req.body);
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    const categories = await Category.update(req.body,
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (!categories[0]) {
      res
        .status(404)
        .json({ message: "Category is not found by that id to update!" });
      return;
    }
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    const categories = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!categories) {
      res
        .status(404)
        .json({ message: "Category is not found with that id to delete!" });
      return;
    }
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;