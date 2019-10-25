import {Component, DoCheck, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, DoCheck {
  user: any;

  constructor(private authSer: AuthService) {
  }

  ngOnInit() {
    this.user = this.authSer.getUser();
  }

  ngDoCheck() {
    this.user = this.authSer.getUser();
  }

  userLogout() {
    this.authSer.userLogout();
  }

}
