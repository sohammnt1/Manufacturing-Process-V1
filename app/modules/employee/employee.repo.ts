import employeeModel from "./employee.schema";
import { IEmployee } from "./employee.types";
import { ObjectId } from "mongodb";

const create = (employee: IEmployee) => employeeModel.create(employee);

const getAll = () => employeeModel.find({ deleted: false });

const getOne = (employeeId: string) =>
  employeeModel.findOne({ employeeId: employeeId });

const getbyRole = (role: string) =>
  employeeModel
    .find({
      $and: [{ role: role }, { deleted: false }],
    })
    .populate("role", "name")
    .populate("shift", "name");

const update = (updated_data: IEmployee) =>
  employeeModel.updateOne(
    {
      employeeId: updated_data.employeeId,
    },
    updated_data
  );

const deleteOne = (employeeId: string) =>
  employeeModel.updateOne({ employeeId: employeeId }, { deleted: true });

export default {
  create,
  getAll,
  getOne,
  update,
  getbyRole,
  deleteOne,
};
