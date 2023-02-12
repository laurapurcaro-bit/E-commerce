import Category from "../models/category.js";
import slugify from "slugify";

export const create = async (req, res) => {
  try {
    const { name } = req.body;
    // Check if name is provided
    if (!name.trim()) {
      return res.json({ error: "Name is required" });
    }
    const existingCategory = await Category.findOne({ name });
    // Check if name exists
    if (existingCategory) {
      return res.json({ error: "Already exists" });
    }

    const category = await new Category({ name, slug: slugify(name) }).save();
    res.json(category);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};

export const update = async (req, res) => {
  try {
    // We need the id because we use it to find the category
    const category = await Category.findByIdAndUpdate(
      req.params.categoryId,
      {
        name: req.body.name,
        slug: slugify(req.body.name),
      },
      // new: true will return the updated category
      { new: true }
    );
    res.json(category);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

export const remove = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.categoryId);
    res.json(category);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

export const list = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

export const read = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    res.json(category);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};
