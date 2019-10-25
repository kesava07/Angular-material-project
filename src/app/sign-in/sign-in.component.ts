import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit, OnDestroy {
  isVisible = false;

  authError: any;

  userLoginForm;

  constructor(private fb: FormBuilder, private authSer: AuthService, private router: Router) {
    this.userLoginForm = this.fb.group({
      userEmail: ['', [Validators.required, Validators.email]],
      userPassword: ['', [Validators.required, Validators.minLength(6)]]
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

  handleLoginUser() {
    if (this.userLoginForm.valid) {
      this.authSer.signInUser(this.userLoginForm.value);
    } else {
      alert('Form is invalid');
    }
  }

  ngOnDestroy() {
    this.authSer.resetError();
  }

}
