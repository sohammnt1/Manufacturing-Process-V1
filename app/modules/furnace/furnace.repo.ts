import furnaceModel from "./furnace.schema";

const getAll = () => furnaceModel.find();

export default {
  getAll,
};
