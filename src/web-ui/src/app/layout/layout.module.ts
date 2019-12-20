import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule
} from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopnavComponent } from './components/topnav/topnav.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import {ApiService} from "../shared/services/api.service";
import {ProductService} from "../shared/services/product.service";
import {UserService} from "../shared/services/user.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {ModalModule} from "ngx-bootstrap";
import {JwtInterceptor} from "../security/jwt.interceptor";
import {ErrorInterceptor} from "../security/authentication.interceptor";
import {ChartsModule} from "ng2-charts";


@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatListModule,
        TranslateModule,
        NgxDatatableModule,
        HttpClientModule,
        ModalModule,
        ChartsModule
    ],
    declarations: [LayoutComponent, NavComponent,
      TopnavComponent, SidebarComponent, FooterComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [ApiService,ProductService,UserService
    , {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}],

})
export class LayoutModule { }


