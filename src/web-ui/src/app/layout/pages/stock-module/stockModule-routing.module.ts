import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StockModuleComponent} from "./stock-module.component";



const routes: Routes = [
    {
        path: '',
        component: StockModuleComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StockModuleRoutingModule{}
