import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BuyModuleComponent} from "./buy-module.component";



const routes: Routes = [
    {
        path: '',
        component: BuyModuleComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BuyModuleRoutingModule{}
