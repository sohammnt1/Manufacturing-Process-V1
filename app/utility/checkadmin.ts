import employeeRepo from "../modules/employee/employee.repo";
import employeeModel from "../modules/employee/employee.schema";
import employeeRoleModel from "../modules/employeeRole/employeeRole.schema";
import furnaceModel from "../modules/furnace/furnace.schema";
import productTypeModel from "../modules/productType/productType.schema";
import storageRackModel from "../modules/storageRack/storageRack.schema";
import shiftModel from "../modules/shift/shift.schema";
import {
  shifts,
  employeeRoles,
  productTypes,
  storageRacks,
  furnaces,
} from "./db_constants";
import { hash } from "bcryptjs";
import { Types } from "mongoose";

const hashedPassword = hash("admin", 12).then((result) => result);

const adminUser = {
  name: "Admin",
  email: "admin@gmail.com",
  password: "",
  employeeId: "admin",
  shift: [shifts.Day],
  role: employeeRoles.Admin,
};

export const checkAdmin = async () => {
  try {
    const result = await employeeRepo.getbyRole(employeeRoles.Admin);
    if (result.length === 0) {
      const hashedPassword = await hash("admin", 12);
      adminUser.password = hashedPassword;
      employeeModel.create(adminUser);
    }
  } catch (error) {
    throw error;
  }
};

export const populate = async () => {
  try {
    const allemployeeRoles = () => {
      return employeeRoleModel
        .find({}, { name: 1, _id: { $toString: "$_id" } })
        .exec();
    };
    const allfurnaces = () => {
      return furnaceModel
        .find({}, { name: 1, _id: { $toString: "$_id" } })
        .exec();
    };
    const allproductTypes = () => {
      return productTypeModel
        .find({}, { name: 1, _id: { $toString: "$_id" } })
        .exec();
    };
    const allStorageRacks = () => {
      return storageRackModel
        .find({}, { rackNumber: 1, _id: { $toString: "$_id" } })
        .exec();
    };
    const allShifts = () => {
      return shiftModel
        .find({}, { name: 1, _id: { $toString: "$_id" } })
        .exec();
    };
    const assignVariable = async () => {
      try {
        const allemployeeRolesArr = await allemployeeRoles();
        const allfurnacesArr = await allfurnaces();
        const allproductTypesArr = await allproductTypes();
        const allStorageRacksArr = await allStorageRacks();
        const allShiftsArr = await allShifts();

        const employeeRoles = [
          { name: "Admin" },
          { name: "Sales_Manager" },
          { name: "Furnace_Operator" },
          { name: "Storage_Keeper" },
          { name: "Delivery_Executive" },
          { name: "Accountant" },
        ];

        const furnaces = [
          { name: "Furnace_1" },
          { name: "Furnace_2" },
          { name: "Furnace_3" },
          { name: "Furnace_4" },
        ];

        const productTypes = [
          { name: "Raw_Material" },
          { name: "Manufactured_Product" },
        ];

        const storageRacks = [
          { rackNumber: "Rack_1" },
          { rackNumber: "Rack_2" },
          { rackNumber: "Rack_3" },
          { rackNumber: "Rack_4" },
          { rackNumber: "Rack_5" },
          { rackNumber: "Rack_6" },
          { rackNumber: "Rack_7" },
          { rackNumber: "Rack_8" },
          { rackNumber: "Rack_9" },
          { rackNumber: "Rack_10" },
          { rackNumber: "Rack_11" },
          { rackNumber: "Rack_12" },
          { rackNumber: "Rack_13" },
          { rackNumber: "Rack_14" },
          { rackNumber: "Rack_15" },
          { rackNumber: "Rack_16" },
          { rackNumber: "Rack_17" },
          { rackNumber: "Rack_18" },
          { rackNumber: "Rack_19" },
          { rackNumber: "Rack_20" },
        ];

        const shifts = [{ name: "Day" }, { name: "Evening" }];

        if (allemployeeRolesArr.length === 0) {
          await employeeRoleModel.insertMany(employeeRoles);
        }
        if (allfurnacesArr.length === 0) {
          await furnaceModel.insertMany(furnaces);
        }
        if (allproductTypesArr.length === 0) {
          await productTypeModel.insertMany(productTypes);
        }
        if (allStorageRacksArr.length === 0) {
          await storageRackModel.insertMany(storageRacks);
        }
        if (allShiftsArr.length === 0) {
          await shiftModel.insertMany(shifts);
        }
        return [
          allemployeeRolesArr,
          allfurnacesArr,
          allproductTypesArr,
          allStorageRacksArr,
          allShiftsArr,
        ];
      } catch (error) {
        throw error;
      }
    };
    const variables = await assignVariable();
    // console.log(variables)
  } catch (error) {
    throw error;
  }
};
