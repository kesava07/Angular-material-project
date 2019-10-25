import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  isVisible = false;

  userSignUp;
  authError: any;

  constructor(private fb: FormBuilder, private authSer: AuthService) {
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
  }

  handleSignUp() {
    if (this.userSignUp.valid) {
      this.authSer.createUser(this.userSignUp.value);
    } else {
      alert('form not valid');
    }
  }

}
