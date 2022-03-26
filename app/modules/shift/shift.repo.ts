import shiftModel from "./shift.schema";

const getAll = () => shiftModel.find()

export default {
    getAll,
}