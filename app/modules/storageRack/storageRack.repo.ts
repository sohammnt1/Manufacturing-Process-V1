import storageRackModel from "./storageRack.schema";

const getAll = () => storageRackModel.find()

export default {
    getAll,
}