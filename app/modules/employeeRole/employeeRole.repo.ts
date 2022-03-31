import employeeRoleModel from "./employeeRole.schema";

const getAll = () => employeeRoleModel.find();

export default {
  getAll,
};
