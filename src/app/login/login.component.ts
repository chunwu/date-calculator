import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public auth: AuthService) {
  }

  ngOnInit() {
  }

  
  login() {
    // this.afAuth.auth.signInWithEmailAndPassword('ie.wuchun@gmail.com', 'Tes1t123');
    this.auth.login();
  }
  logout() {
    // this.afAuth.auth.signOut();
  }

}
