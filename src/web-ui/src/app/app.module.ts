import { LayoutModule } from '@angular/cdk/layout';
import { OverlayModule } from '@angular/cdk/overlay';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule, HttpClient, HTTP_INTERCEPTORS} from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiService } from './shared/services/api.service';
import {JwtInterceptor} from "./security/jwt.interceptor";
import {AuthGuard} from "./security/auth.guard";
import {AuthenticationService} from "./security/authentication.service";
import {ErrorInterceptor} from "./security/authentication.interceptor";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {RegistrationModule} from "./registration/registration.module";
import {RegistrationComponent} from "./registration/registration.component";
import {LoginModule} from "./login/login.module";
import {UserService} from "./shared/services/user.service";
import {ChartsModule} from "ng2-charts";
import { ConfirmationComponent } from './shared/confirmation/confirmation.component';
import { ReportFormComponent } from './shared/report-form/report-form.component';
import {NotFoundComponent} from "./shared/not-found/not-found.component";


// AoT requires an exported function for factories
export const createTranslateLoader = (http: HttpClient) => {
    /* for development
    return new TranslateHttpLoader(
        http,
        '/start-javascript/sb-admin-material/master/dist/assets/i18n/',
        '.json'
    );*/
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
};

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        LayoutModule,
        OverlayModule,
        ReactiveFormsModule,
        FormsModule,
        RegistrationModule,
        LoginModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),
        MatFormFieldModule,
        MatCheckboxModule,
        ChartsModule
    ],
    providers: [ApiService,AuthGuard,AuthenticationService, RegistrationComponent,UserService,
        {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class AppModule {}
