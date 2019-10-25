import {Component, OnInit} from '@angular/core';
import {AuthService} from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'help-u-material';

  user: any;

  constructor(private authSer: AuthService) {
  }

  ngOnInit() {
    this.authSer.getUserStatus()
      .subscribe(user => {
        this.user = user;
      });
  }
}
