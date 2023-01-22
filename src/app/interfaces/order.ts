import { OrderItem } from './order-item';

export class Order {
  id?: string;
  orderItems?: OrderItem[];
  address?: string;
  city?: string;
  zip?: string;
  phone?: string;
  status?: number;
  totalPrice?: string;
  user?: any;
  dateOrdered?: string;
}
