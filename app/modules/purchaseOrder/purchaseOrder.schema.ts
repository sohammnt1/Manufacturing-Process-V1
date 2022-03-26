import { Schema, model, Types } from "mongoose";

class purchaseOrderSchema extends Schema {
    constructor() {
        super({
            customer_id: { type: Types.ObjectId, required: true ,ref:"customer"},
            product: [
                {   
                    productName: {type: String, required: true},
                    dimensions:{type:String,required:true},
                    quantity:{type:Number,required:true},
                    price:{type:Number,required:true},
                    postMachiningWeight:{type:Number,required:false},
                    material:{type:String,required:true},
                    manufactured:{type:Boolean,required:true,default:false},
                    furnaceId :{type:Types.ObjectId,required:false},
                    productTotal:{type:Number,required:false}
                }
            ],
            address: { type: String, required: true },
            subtotal: { type: Number, required: false },
            gst: { type: Number, required: false },
            total: { type: Number, required: false },
            assignedEmployee:{
                    Sales_Manager:{type: Types.ObjectId, required: false, ref:"employees"},
                    Furnace_Operator:[{type:Types.ObjectId,required:false, ref:"employees"}],
                    Storage_Keeper:{type:Types.ObjectId,required:false, ref:"employees"},
                    Delivery_Executive:{type:Types.ObjectId,required:false, ref:"employees"},
                    Accountant:{type:Types.ObjectId,required:false, ref:"employees"},
                },
            status:{
                type:String,
                required:true,
                enum : ['PreProduction','Production','PostMachiningDone','Stored','OutForDelivery','Delivered','PaymentPending','OrderCompleted'],
                default:"PreProduction"}
        }, {
            timestamps: true,
        });
    }
}

const purchaseOrderModel = model('purchaseorder', new purchaseOrderSchema());

export default purchaseOrderModel;
