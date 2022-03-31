import { Schema, model, Types } from "mongoose";

class storageSchema extends Schema {
  constructor() {
    super(
      {
        storageRackIds: [
          { type: Types.ObjectId, required: true, ref: "storagerack" },
        ],
        purchaseOrderId: {
          type: Types.ObjectId,
          required: true,
          ref: "purchaseorder",
        },
        // product: [{
        //     name: {type: String, required: true},
        //     quantity:{type:Number,required:true},
        //     productType: { type: Types.ObjectId, required: true,ref:"producttype" },
        //     }],
      },
      {
        timestamps: true,
      }
    );
  }
}

const storageModel = model("storage", new storageSchema());

export default storageModel;
