import {category} from "./category";
import {user} from "./user";

export class product {
    id: number;
    productName: string;
    productCode: string;
    productCategory: category;
    user: user;
}
