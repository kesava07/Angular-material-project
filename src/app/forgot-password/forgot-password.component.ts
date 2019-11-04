import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../auth/auth.service';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {

  isVisible = false;

  authError: any;
  userForgotPassword;

  constructor(private router: Router, private authSer: AuthService, private fb: FormBuilder) {
    this.userForgotPassword = this.fb.group({
      userEmail: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {
    this.authSer.eventAuthError$.subscribe(error => {
      this.authError = error;
    });
    this.authSer.isEnabled$.subscribe(type => {
      this.isVisible = type;
    });
    if (this.authSer.getUser()) {
      this.router.navigate(['/dashboard']);
    }
  }

  handleForgotPassword() {
    this.authSer.resetError();
    if (this.userForgotPassword.valid) {
      this.authSer.userForgotPassword(this.userForgotPassword.value.userEmail);
    } else {
      alert('Enter email');
    }
  }

  ngOnDestroy() {
    this.authSer.resetError();
  }

}
