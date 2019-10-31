import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'dashboard'
            },
            {
                path: 'dashboard',
                loadChildren: './dashboard/dashboard.module#DashboardModule'
            },
            {
              path: 'stockModule',
                loadChildren: './pages/stock-module/stock-module.module#StockModuleModule'
            },
            {
              path: 'procurementModule',
                loadChildren: './pages/buy-module/buy-module.module#BuyModuleModule'
            },
            {
              path: 'produceModule',
                loadChildren: './pages/produce-module/produce-module.module#ProduceModuleModule'
            },
            {
              path: 'manageModule',
              loadChildren: './pages/manage-module/manage-module.module#ManageModuleModule'
            },
            {
                path: 'admin',
                loadChildren: './admin/admin.module#AdminModule'
            }
            //{path: '**', component: NotFoundComponent},
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LayoutRoutingModule {}
