import deliveryModel from "./delivery.schema";
import { IDelivery } from "./delivery.types";
import { ObjectId } from "mongodb";

const create = (delivery: IDelivery) => deliveryModel.create(delivery);

const getbyId = (id: string) => deliveryModel.aggregate(
    [
        { $match: { $and: [{ deliveryExecutiveId: new ObjectId(id) }, { deliveryStatus: "NotDelivered" }] } },
    ]);

const attemptDelivery = (updated_data: IDelivery) => deliveryModel.updateOne(
    {
        purchaseOrderId: new ObjectId(updated_data.purchaseOrderId)
    },
    {
        $set: {
            deliveryTime:updated_data.deliveryTime,
            deliveryRemark:updated_data.deliveryRemark,
            deliveryStatus:updated_data.deliveryStatus
        }
    });

const deleteOne = (deliveryId: string) => deliveryModel.updateOne(
    { deliveryId: deliveryId },
    { deleted: true }
);

export default {
    create,
    attemptDelivery,
    getbyId,
    deleteOne
}