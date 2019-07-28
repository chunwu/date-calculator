import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  displayName: string;
  
  constructor(public auth: AuthService) {
    auth.getLoggedInName.subscribe(name => this.loggedIn(name));
    auth.loggedOut.subscribe(() => this.loggedOut());
  }

  private loggedIn(name: string): void {
    this.displayName = name;
  }

  private loggedOut() {
    this.displayName = null;
  }

  ngOnInit() {
  }

}