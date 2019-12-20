import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ApiService} from "../../../shared/services/api.service";
import {product} from "../../../common/product";

@Component({
  selector: 'app-manage-module',
  templateUrl: './manage-module.component.html',
  styleUrls: ['./manage-module.component.scss'],
})
export class ManageModuleComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
  }


}
