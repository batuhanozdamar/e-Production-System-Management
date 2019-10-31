import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockModuleComponent } from './stock-module.component';
import {StockModuleRoutingModule} from "./stockModule-routing.module";

@NgModule({
  declarations: [StockModuleComponent],
  imports: [
    CommonModule,
      StockModuleRoutingModule
  ]
})
export class StockModuleModule { }
