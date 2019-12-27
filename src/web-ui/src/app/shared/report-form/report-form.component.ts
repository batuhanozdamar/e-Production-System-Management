import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ConnectionService} from "./connection.service";
import {ApiService} from "../services/api.service";
import {HttpErrorResponse} from "@angular/common/http";
import {first} from "rxjs/operators";
import {AuthenticationService} from "../../security/authentication.service";

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.scss']
})

export class ReportFormComponent implements OnInit {

  contactForm: FormGroup;
  disabledSubmitButton: boolean = true;
  optionsSelect: Array<any>;

  submitted = false;

  @HostListener('input') oninput() {

    if (this.contactForm.valid) {
      this.disabledSubmitButton = false;
    }
  }

  constructor(private fb: FormBuilder, private authenticationService: AuthenticationService) {

    this.contactForm = this.fb.group({
      'nameSurname': ['', Validators.required],
      'email': ['', Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")],
      'subject': ['', Validators.required],
      'message': ['', Validators.required],
      'contactFormCopy': [''],
    });
  }


  onSubmit() {
    this.submitted = true;

    if (this.contactForm.invalid) {
      alert('Please fill the required areas.');
      return;
    }

    this.authenticationService.reportForm(this.contactForm.value).subscribe(() => {
      alert('Your message has been sent.');
      this.contactForm.reset();
      this.disabledSubmitButton = true;
    }, error => {
      console.log('Error', error);
    });
  }

  ngOnInit(): void {
  }


}
