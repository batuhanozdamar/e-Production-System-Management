import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProduceModuleComponent} from "./produce-module.component";



const routes: Routes = [
    {
        path: '',
        component: ProduceModuleComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProduceModuleRoutingModule{}
