import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit, OnDestroy {
  isVisible = false;

  userSignUp;
  authError: any;

  constructor(private fb: FormBuilder, private authSer: AuthService, private router: Router) {
    this.userSignUp = this.fb.group({
      userName: ['', Validators.required],
      userEmail: ['', [Validators.required, Validators.email]],
      userPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    this.authSer.eventAuthError$.subscribe(data => {
      this.authError = data;
    });
    this.authSer.isEnabled$.subscribe(type => {
      this.isVisible = type;
    });
    if (this.authSer.getUser()) {
      this.router.navigate(['/dashboard']);
    }
  }

  handleSignUp() {
    if (this.userSignUp.valid) {
      this.authSer.createUser(this.userSignUp.value);
    } else {
      alert('form not valid');
    }
  }

  ngOnDestroy() {
    this.authSer.resetError();
  }

}
