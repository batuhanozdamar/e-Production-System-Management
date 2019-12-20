import {CompanyProduct} from "./companyProduct";
import {user} from "./user";
import {offerStatus} from "./offerStatus";

export class offer{

    productName: string;
    companyProduct: CompanyProduct;
    user: user;
    askedPrice: number;
    offerStatus: offerStatus;
    responsePrice: number;
    soldAt: Date;

}
