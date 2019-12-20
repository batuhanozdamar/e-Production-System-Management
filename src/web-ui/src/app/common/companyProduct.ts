import {company} from "./company";
import {product} from "./product";
import {user} from "./user";

export class CompanyProduct {
    id: number;
    company: company;
    product: product;
    productPrice: number;
    productAmount: number;
    stockOnHand: string;
    user: user;
}
