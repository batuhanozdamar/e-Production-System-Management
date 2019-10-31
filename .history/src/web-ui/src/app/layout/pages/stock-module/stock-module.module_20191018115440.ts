import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockModuleComponent } from './stock-module.component';
import {StockModuleRoutingModule} from './stockModule-routing.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  declarations: [StockModuleComponent],
  imports: [
    CommonModule,
      StockModuleRoutingModule,
      Ng2SmartTableModule,
  ]
})
export class StockModuleModule { }
