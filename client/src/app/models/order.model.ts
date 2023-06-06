import {User} from "./user.model";
import {OrderPosition} from "./orderposition.model";

export interface Order {
  orderId?: string;
  user: User;
  date: Date;
  orderPositions: OrderPosition[];
}
