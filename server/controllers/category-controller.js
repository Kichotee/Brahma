const asyncHandler = require("express-async-handler");
const category = require("../models/category");

const getCategories = asyncHandler(async (req, res) => {
  const categories = await category.find();
  res.status(200).json({
    data: {
      categories,
    },
  });
});

const createCategory = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error("Please add field 'name'.");
  }

  const categoryCreated = await category.create({
    name: req.body.name,
    description: req.body?.description,
  });

  res.status(201).json(
    {message:"Category created",data:categoryCreated});
});

const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400);
    throw new Error("No Category Id");
  }

  if (!req.body.name) {
    res.status(400);
    throw new Error("Please add field 'name'.");
  }
  let categoryUpdated = await category.findById(id).exec();
  if (!categoryUpdated) {
    console.log(categoryUpdated);
    res.status(400);
    throw new Error("Category not found");
  }
  categoryUpdated = await category.findByIdAndUpdate(
    { _id: id },
    {
      name: req.body.name,
      description: req.body?.description,
    }
  );
  res.status(200).json({message:"Category updated",data:categoryUpdated});
});

const deleteCategory = asyncHandler(async (req, res) => {
  if (!req.query.id) {
    res.status(400);
    throw new Error("No Category Id");
  }

  if (!req.body.name) {
    res.status(400);
    throw new Error("Please add field 'name'.");
  }
  const category = await category.findById(req.query.id);
  if (!category) {
    res.status(400);
    throw new Error("Category not found");
  }
  category.update({
    name: req.body.name,
    description: req.body?.description,
  });
});

module.exports = {
  getCategories,
  createCategory,
  updateCategory,
};
