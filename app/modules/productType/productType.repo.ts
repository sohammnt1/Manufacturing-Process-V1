import productTypeModel from "./productType.schema";

const getAll = () => productTypeModel.find();

export default {
  getAll,
};
