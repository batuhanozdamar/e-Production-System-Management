import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProduceModuleComponent } from './produce-module.component';
import {ProduceModuleRoutingModule} from "./produceModule-routing.module";

@NgModule({
  declarations: [ProduceModuleComponent],
  imports: [
    CommonModule,
      ProduceModuleRoutingModule
  ]
})
export class ProduceModuleModule { }
