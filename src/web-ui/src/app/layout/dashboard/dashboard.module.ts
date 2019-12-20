import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatCardModule, MatIconModule, MatTableModule } from '@angular/material';
import { MatGridListModule } from '@angular/material/grid-list';

import { StatModule } from '../../shared/modules/stat/stat.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import {Ng2SmartTableModule} from "ng2-smart-table";
import {ChartsModule} from "ng2-charts";
import { OfferedItemsComponent } from './offered-items/offered-items.component';
import { RejectedItemsComponent } from './rejected-items/rejected-items.component';
import { PurchasedItemsComponent } from './purchased-items/purchased-items.component';
import { MyOffersComponent } from './my-offers/my-offers.component';

@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule,
        MatGridListModule,
        StatModule,
        MatCardModule,
        MatCardModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        FlexLayoutModule.withConfig({addFlexToParent: false}),
        Ng2SmartTableModule,
        ChartsModule

    ],
    declarations: [DashboardComponent, OfferedItemsComponent, RejectedItemsComponent, PurchasedItemsComponent, MyOffersComponent]
})
export class DashboardModule {}
