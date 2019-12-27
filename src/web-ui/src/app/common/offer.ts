import {companyProduct} from "./companyProduct";
import {user} from "./user";
import {offerStatus} from "./offerStatus";

export class offer{


    companyProduct: companyProduct;
    user: user;
    askedPrice: number;
    offerStatus: offerStatus;
    responsePrice: number;
    soldAt: Date;

}
