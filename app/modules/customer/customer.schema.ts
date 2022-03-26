import { Schema, model, Types } from "mongoose";

class customerSchema extends Schema {
    constructor() {
        super({
            name: { type: String, required: true },
            address: { type: String, required: true },
            email: { type: String, required: true },
            contact: { type: Number, required: true },
            deleted:{type:Boolean,required:true,default:false}
        }, {
            timestamps: true,
        });
    }
}

const customerModel = model('customer', new customerSchema());

export default customerModel;
