// create interface for product
export interface InterfaceProduct {
  id: number;
  name: string;
  price: number;
}

// có thể không define thuộc tính, nhưng khi triệu gọi, không có thuộc tính sẽ bị lỗi hoặc undefined 