import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageModuleComponent } from './manage-module.component';
import {ManageModuleRoutingModule} from "./manageModule-routing.module";
import {Ng2SmartTableModule} from "ng2-smart-table";
import { ProductComponent } from './product/product.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AddCategoryComponent } from './add-category/add-category.component';

@NgModule({
  declarations: [ManageModuleComponent, ProductComponent, AddUserComponent, AddCategoryComponent],
  imports: [
      CommonModule,
      ManageModuleRoutingModule,
      Ng2SmartTableModule,
  ]
})
export class ManageModuleModule { }
