import {User} from "./user.model";

export interface Article {
  id?: number;
  name: string;
  description: string;
  category: string;
  price: number;
  user?: User;
}
