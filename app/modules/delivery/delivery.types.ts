export interface IDelivery {
  _id: string;
  deliveryExecutiveId: string;
  purchaseOrderId: string;
  deliveryTime: Date;
  deliveryRemark: string;
  deliveryStatus: string;
  customerName: string;
  customerContact: string;
  customerAddress: string;
  customerEmail: string;
}
