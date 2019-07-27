import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { NgZone } from '@angular/core';

import { Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();
  @Output() loggedOut: EventEmitter<any> = new EventEmitter();

  isLoggedIn: boolean;
  user: firebase.User;

  constructor(public afAuth: AngularFireAuth,
      private router: Router,
      private zone: NgZone) {
    this.isLoggedIn = false;
  }

  login() {
    return this.doGoogleLogin();
  }

  doGoogleLogin() {
    return new Promise<any>((resolve, reject) => {
      let provider = new auth.GoogleAuthProvider();
      this.afAuth.auth.signInWithPopup(provider).then(result => {
        console.log('result: ' + result);
        this.isLoggedIn = true;
        this.user = result.user;
        this.getLoggedInName.emit(result.user.displayName);
        this.zone.run(() => this.router.navigate(['/']));
        
        resolve(result);
      }, err => {
        console.log(err);
        window.alert(err);
        reject(err);
      });
    })
  }

  logout() {
    return this.afAuth.auth.signOut().then(() => {
      this.isLoggedIn = false;
      this.user = null;
      this.loggedOut.emit();
      this.router.navigate(['/']);
    });
  }
}