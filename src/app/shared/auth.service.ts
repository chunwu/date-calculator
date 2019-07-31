import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { NgZone } from '@angular/core';

import { Observable, of } from 'rxjs';
import { switchMap} from 'rxjs/operators';

interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  favoriteColor?: string;
  admin?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<User>;

  constructor(public afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router,
              private zone: NgZone) {
    //// Get auth data, then get firestore user document || null
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
        } else {
          return of(null)
        }
      })
    );
  }

  login() {
    return this.doGoogleLogin();
  }

  doGoogleLogin() {
    return new Promise<any>((resolve, reject) => {
      let provider = new auth.GoogleAuthProvider();
      this.afAuth.auth.signInWithPopup(provider).then(result => {
        this.updateUserData(result.user);

        this.zone.run(() => this.router.navigate(['/']));
        
        resolve(result);
      }, err => {
        console.log(err);
        window.alert(err);
        reject(err);
      });
    })
  }

  private updateUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    };

    return userRef.set(data, { merge: true })
  }

  logout() {
    return this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    }).catch(err => {
      console.log(err);
    });
  }
}