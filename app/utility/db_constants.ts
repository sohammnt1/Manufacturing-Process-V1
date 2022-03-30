import { ObjectId } from "mongodb";

let populatedVariableArray: any[] = [
  [
    { name: "Admin", _id: new ObjectId("623945ae147217c8959381bc") },
    {
      name: "Sales_Manager",
      _id: new ObjectId("623945ae147217c8959381bd"),
    },
    {
      name: "Furnace_Operator",
      _id: new ObjectId("623945ae147217c8959381be"),
    },
    {
      name: "Storage_Keeper",
      _id: new ObjectId("623945ae147217c8959381bf"),
    },
    {
      name: "Delivery_Executive",
      _id: new ObjectId("623945ae147217c8959381c0"),
    },
    {
      name: "Accountant",
      _id: new ObjectId("623945ae147217c8959381c1"),
    },
  ],
  [
    {
      name: "Furnace_1",
      _id: new ObjectId("623945ae147217c8959381c3"),
    },
    {
      name: "Furnace_2",
      _id: new ObjectId("623945ae147217c8959381c4"),
    },
    {
      name: "Furnace_3",
      _id: new ObjectId("623945ae147217c8959381c5"),
    },
    {
      name: "Furnace_4",
      _id: new ObjectId("623945ae147217c8959381c6"),
    },
  ],
  [
    {
      name: "Raw_Material",
      _id: new ObjectId("623945ae147217c8959381c8"),
    },
    {
      name: "Manufactured_Product",
      _id: new ObjectId("623945ae147217c8959381c9"),
    },
  ],
  [
    {
      rackNumber: "Rack_1",
      _id: new ObjectId("623945ae147217c8959381cb"),
    },
    {
      rackNumber: "Rack_2",
      _id: new ObjectId("623945ae147217c8959381cc"),
    },
    {
      rackNumber: "Rack_3",
      _id: new ObjectId("623945ae147217c8959381cd"),
    },
    {
      rackNumber: "Rack_4",
      _id: new ObjectId("623945ae147217c8959381ce"),
    },
    {
      rackNumber: "Rack_5",
      _id: new ObjectId("623945ae147217c8959381cf"),
    },
    {
      rackNumber: "Rack_6",
      _id: new ObjectId("623945ae147217c8959381d0"),
    },
    {
      rackNumber: "Rack_7",
      _id: new ObjectId("623945ae147217c8959381d1"),
    },
    {
      rackNumber: "Rack_8",
      _id: new ObjectId("623945ae147217c8959381d2"),
    },
    {
      rackNumber: "Rack_9",
      _id: new ObjectId("623945ae147217c8959381d3"),
    },
    {
      rackNumber: "Rack_10",
      _id: new ObjectId("623945ae147217c8959381d4"),
    },
    {
      rackNumber: "Rack_11",
      _id: new ObjectId("623945ae147217c8959381d5"),
    },
    {
      rackNumber: "Rack_12",
      _id: new ObjectId("623945ae147217c8959381d6"),
    },
    {
      rackNumber: "Rack_13",
      _id: new ObjectId("623945ae147217c8959381d7"),
    },
    {
      rackNumber: "Rack_14",
      _id: new ObjectId("623945ae147217c8959381d8"),
    },
    {
      rackNumber: "Rack_15",
      _id: new ObjectId("623945ae147217c8959381d9"),
    },
    {
      rackNumber: "Rack_16",
      _id: new ObjectId("623945ae147217c8959381da"),
    },
    {
      rackNumber: "Rack_17",
      _id: new ObjectId("623945ae147217c8959381db"),
    },
    {
      rackNumber: "Rack_18",
      _id: new ObjectId("623945ae147217c8959381dc"),
    },
    {
      rackNumber: "Rack_19",
      _id: new ObjectId("623945ae147217c8959381dd"),
    },
    {
      rackNumber: "Rack_20",
      _id: new ObjectId("623945ae147217c8959381de"),
    },
  ],
  [
    { name: "Day", _id: new ObjectId("623945ae147217c8959381e0") },
    { name: "Evening", _id: new ObjectId("623945ae147217c8959381e1") },
  ],
];

const convertArrayToObject = (array: any, key: any) => {
  const initialValue = {};
  return array.reduce((obj: any, item: any) => {
    return {
      ...obj,
      [item[key]]: item._id.toHexString(),
    };
  }, initialValue);
};

export const employeeRoles = convertArrayToObject(
  populatedVariableArray[0],
  "name"
);
console.log(employeeRoles);
export const furnaces = convertArrayToObject(populatedVariableArray[1], "name");
export const productTypes = convertArrayToObject(
  populatedVariableArray[2],
  "name"
);
export const storageRacks = convertArrayToObject(
  populatedVariableArray[3],
  "rackNumber"
);
export const shifts = convertArrayToObject(populatedVariableArray[4], "name");
