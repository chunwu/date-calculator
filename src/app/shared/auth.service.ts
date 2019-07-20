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

  isLoggedIn: boolean;
  user: firebase.User;

  constructor(public afAuth: AngularFireAuth,
      private router: Router,
      private zone: NgZone) {
    this.isLoggedIn = false;
  }

  login() {
    // this.afAuth.auth.signInWithEmailAndPassword('ie.wuchun@gmail.com', 'Tes1t123');
    let self: AuthService = this;
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(function(result) {
      console.log('result: ' + result);
      self.isLoggedIn = true;
      self.user = result.user;
      // self.router.navigateByUrl('https://google.com');
      self.getLoggedInName.emit(result.user.displayName);
      self.zone.run(() => self.router.navigate(['/']));
    });
  }
}
