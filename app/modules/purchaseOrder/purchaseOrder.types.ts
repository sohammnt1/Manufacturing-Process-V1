export interface IPurchaseOrder {
  _id: string;
  customer_id: string;
  product: object[];
  address: string;
  subtotal: number;
  gst: Number;
  total: Number;
  assignedEmployee: {
    Sales_Manager: string;
    Furnace_Operator: string;
    Storage_Keeper: string;
    Delivery_Executive: string;
    Accountant: string;
  };
  status: string;
}
