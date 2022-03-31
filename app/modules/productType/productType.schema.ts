import { Schema, model, Types } from "mongoose";

class productTypeSchema extends Schema {
  constructor() {
    super(
      {
        name: { type: String, required: true },
      },
      {
        timestamps: true,
      }
    );
  }
}

const productTypeModel = model("producttype", new productTypeSchema());

export default productTypeModel;
