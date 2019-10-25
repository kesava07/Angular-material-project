import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase} from '@angular/fire/database';
import {Router} from '@angular/router';
import {FirebaseAuth} from '@angular/fire';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private eventAuthError = new BehaviorSubject<string>('');
  eventAuthError$ = this.eventAuthError.asObservable();

  private isEnabled = new BehaviorSubject<boolean>(false);
  isEnabled$ = this.isEnabled.asObservable();

  newUser;

  constructor(private afAuth: AngularFireAuth, private afDb: AngularFireDatabase, private router: Router) {
  }

  createUser(user) {
    this.isEnabled.next(true);
    this.afAuth.auth.createUserWithEmailAndPassword(user.userEmail, user.userPassword)
      .then(createdUser => {
        this.newUser = user;
        createdUser.user.updateProfile({
          displayName: user.userName
        }).then(() => this.saveUserToDb(createdUser).then(() => {
          console.log('user created successfully');
          this.isEnabled.next(false);
          this.router.navigate(['/sign-in']);
        }));
      }).catch(err => {
      console.log(err);
      this.isEnabled.next(false);
      this.eventAuthError.next(err);
    });
  }

  saveUserToDb(createdUser: firebase.auth.UserCredential) {
    return this.afDb.database.ref('users').child(createdUser.user.uid).set({
      email: this.newUser.userEmail,
      name: this.newUser.userName
    });
  }

  signInUser(user) {
    this.isEnabled.next(true);
    this.afAuth.auth.signInWithEmailAndPassword(user.userEmail, user.userPassword)
      .then(createdUser => {
        this.isEnabled.next(false);
        this.router.navigate(['/dashboard']);
      }).catch(err => {
      this.eventAuthError.next(err);
      this.isEnabled.next(false);
    });
  }


  getUserStatus() {
    return this.afAuth.authState;
  }

  userLogout() {
    this.afAuth.auth.signOut()
      .then(() => {
        this.router.navigate(['/sign-in']);
      });
  }

}
