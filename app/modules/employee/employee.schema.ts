import { Schema, model, Types } from "mongoose";

class employeeSchema extends Schema {
  constructor() {
    super(
      {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        employeeId: { type: String, required: true },
        role: { type: Types.ObjectId, required: true, ref: "employeerole" },
        shift: [{ type: Types.ObjectId, required: true, ref: "shift" }],
        deleted: { type: Boolean, required: true, default: false },
      },
      {
        timestamps: true,
      }
    );
  }
}

const employeeModel = model("employee", new employeeSchema());

export default employeeModel;
