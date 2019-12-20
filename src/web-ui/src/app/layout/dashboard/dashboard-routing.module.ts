import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import {OfferedItemsComponent} from "./offered-items/offered-items.component";
import {RejectedItemsComponent} from "./rejected-items/rejected-items.component";
import {PurchasedItemsComponent} from "./purchased-items/purchased-items.component";
import {MyOffersComponent} from "./my-offers/my-offers.component";

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent
    },
    {
        path: 'offeredItems',
        component: OfferedItemsComponent
    },
    {
        path: 'rejectedItems',
        component: RejectedItemsComponent
    },
    {
        path: 'purchased-items',
        component: PurchasedItemsComponent
    },
    {
        path: 'my-offers',
        component: MyOffersComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule {}
