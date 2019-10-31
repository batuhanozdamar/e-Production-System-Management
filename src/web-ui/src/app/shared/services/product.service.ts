import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Rx";
import {map} from "rxjs/internal/operators";
import {ApiService} from "./api.service";

@Injectable({
    providedIn: 'root'
})
export class ProductService{

    private PROJECT_PATH = "/product";

    constructor(private apiService: ApiService ){}

    getAllPageable(page) : Observable<any>{
        return this.apiService.get(this.PROJECT_PATH+'/pagination',page).pipe(map(
            res =>{
                if(res){
                    return res;
                }else{
                    return {};
                }
            }
        ));
    }

    getAll() : Observable<any>{
        return this.apiService.get(this.PROJECT_PATH).pipe(map(
            res =>{
                if(res){
                    return res;
                }else{
                    return {};
                }
            }
        ));
    }

    getById(id) : Observable<any>{
        return this.apiService.get(this.PROJECT_PATH,id).pipe(map(
            res =>{
                if(res){
                    return res;
                }else{
                    console.log(res);
                    return {};
                }
            }
        ));
    }

    createProduct(product) : Observable<any>{
        return this.apiService.post(this.PROJECT_PATH,product).pipe(map(
            res =>{
                if(res){
                    return res;
                }else{
                    console.log(res);
                    return {};
                }
            }
        ));
    }

    delete(id) : Observable<any>{
        return this.apiService.delete(this.PROJECT_PATH +'/'+id).pipe(map(
            res =>{
                if(res){
                    return res;
                }else{
                    console.log(res);
                    return {};
                }
            }
        ));
    }
}
