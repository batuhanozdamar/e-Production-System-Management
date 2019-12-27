import {company} from "./company";
import {product} from "./product";
import {user} from "./user";

export class companyProduct {
    id: number;
    company: company;
    product: product;
    productPrice: number;
    productAmount: number;
    productColor: string;
    stockOnHand: string;
    user: user;
}
