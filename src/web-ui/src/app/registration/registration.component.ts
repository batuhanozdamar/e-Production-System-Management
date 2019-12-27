import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthenticationService} from "../security/authentication.service";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')],
      nameSurname: ['', Validators.required],
      company: ['', Validators.required],
      email: ['', Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")],
    });
    this.authenticationService.logout();
  }

  get f() {
    return this.registerForm.controls;
  }

  register() {

    this.submitted = true;

    if (this.registerForm.invalid) {
      alert('Please fill the required areas.');
      return;
    }

    this.loading = true;
    this.authenticationService.register(this.registerForm.value)
        .pipe(first())
        .subscribe(
            data => {
              this.router.navigate(['/login']);
            },
            error => {
              this.error = error;
              this.loading = false;
            });
  }
}
