const Product = require("../models/product");

const getAllProductStatic = async (req, res) => {
  const search = "ab";
  const product = await Product.find({ price: { $gt: 30 } })
    .sort("price")
    .select("name price")
    .limit(10);
  res.status(200).json({ product, nbHits: product.length });
};

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;

  const queryObject = {};

  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }

  if (company) {
    queryObject.company = company;
  }

  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  if (numericFilters) {
    const operatorMatch = {
      ">": "$gt",
      ">=": "$gt",
      "=": "$eq",
      "<": "$lt",
      "=<": "$lte",
    };

    const regEx = /\b(<|>|>=|=<|=)\b/g;

    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMatch[match]}-`
    );

    const options = ["price", "rating"];

    filters = filters.split(",").forEach((item) => {
      const [fields, operator, value] = item.split("-");
      if (options.includes(fields)) {
        queryObject[fields] = { [operator]: Number(value) };
      }
    });
  }
  console.log(queryObject);
  let result = Product.find(queryObject);
  if (sort) {
    // product = product.sort();
    const sortList = sort.split(",").join("");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }

  if (fields) {
    const fieldlist = fields.split(",").join("");
    result = result.select(fieldlist);
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skips = (page - 1) * limit;

  result = result.skip(skips).limit(limit);
  const product = await result;
  res.status(200).json({ product, nbHits: product.length });
};

module.exports = { getAllProductStatic, getAllProducts };
