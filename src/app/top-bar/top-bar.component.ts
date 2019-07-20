import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  isLoggedIn: boolean;
  userName: string;
  constructor(private auth: AuthService) {
    auth.getLoggedInName.subscribe(name => this.changeName(name));
    this.isLoggedIn = auth.isLoggedIn;
  }

  private changeName(name: string): void {
    this.isLoggedIn = true;
    this.userName = name;
  }

  ngOnInit() {
  }

}