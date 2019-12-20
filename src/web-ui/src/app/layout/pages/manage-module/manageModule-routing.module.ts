import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ManageModuleComponent} from "./manage-module.component";
import {ProductComponent} from "./product/product.component";
import {AddUserComponent} from "./add-user/add-user.component";
import {AddCategoryComponent} from "./add-category/add-category.component";


const routes: Routes = [
    {
        path: '',
        component: ManageModuleComponent
    },
    {
        path: 'product',
        component: ProductComponent
    },
    {
        path: 'addUser',
        component: AddUserComponent
    },
    {
        path: 'addCategory',
        component: AddCategoryComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManageModuleRoutingModule{}
