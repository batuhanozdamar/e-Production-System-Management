import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageModuleComponent } from './manage-module.component';
import {ManageModuleRoutingModule} from "./manageModule-routing.module";

@NgModule({
  declarations: [ManageModuleComponent],
  imports: [
    CommonModule,
      ManageModuleRoutingModule
  ]
})
export class ManageModuleModule { }
