import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  user: any;

  constructor(private authSer: AuthService) {
  }

  ngOnInit() {
    this.authSer.getUserStatus()
      .subscribe(user => {
        this.user = user;
      });
  }

  userLogout() {
    this.authSer.userLogout();
  }

}
