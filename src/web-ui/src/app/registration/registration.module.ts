import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration.component';
import {LoginRoutingModule} from "../login/login-routing.module";
import {MatInputModule} from "@angular/material/input";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatButtonModule} from "@angular/material/button";
import {FlexLayoutModule} from "@angular/flex-layout";
import {ReactiveFormsModule} from "@angular/forms";
import {RegisterationRoutingModule} from "./registeration-routing.module";

@NgModule({
  declarations: [RegistrationComponent],
  imports: [
    CommonModule,
    RegisterationRoutingModule,
    LoginRoutingModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    FlexLayoutModule.withConfig({addFlexToParent: false}),
    ReactiveFormsModule,
  ]
})
export class RegistrationModule { }
