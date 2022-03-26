import { Schema, model, Types } from "mongoose";

class deliverySchema extends Schema {
    constructor() {
        super({
            deliveryExecutiveId: { type: Types.ObjectId, required: true, ref: "employee" },
            purchaseOrderId: { type: Types.ObjectId, required: true, ref: "purchaseorder" },
            deliveryTime:{type:Date,required:false},
            deliveryRemark:{type:String,required:false},
            deliveryStatus:{type:String,required:false,enum:["Delivered","NotDelivered"],default:"NotDelivered"},
            deleted:{type:Boolean,required:true,default:false},
            customerName:{type:String,required:true},
            customerContact:{type:String,required:true},
            customerAddress:{type:String,required:true},
            customerEmail:{type:String,required:true}
        }, {
            timestamps: true,
        });
    }
}

const deliveryModel = model('delivery', new deliverySchema());

export default deliveryModel;
