// Interface cho từng customer trong danh sách
export interface InterfaceCustomer {
  Id: string;
  Name: string;
  Email: string;
  Age: number;
  Image: string;
}

// Interface cho loại customer (VIP, Normal, etc.)
export interface InterfaceCustomerType {
  CustomerTypeId: number;
  CustomterTypeName: string;
  Customers: InterfaceCustomer[];
}
