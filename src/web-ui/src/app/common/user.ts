import {role} from "./role";
import {company} from "./company";

export class user{
    id: number;
    username:string;
    password:string;
    nameSurname:string;
    email:string;
    role: role;
    company: company;
}
