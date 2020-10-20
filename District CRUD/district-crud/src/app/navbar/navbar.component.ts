import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isCollapsed: Boolean = true;
  constructor(private router: Router) { }

  ngOnInit() {
    localStorage.setItem('Log', "1");
  }

  public LogOut() {

    localStorage.removeItem('UserToken');
    localStorage.removeItem('User_role');
    localStorage.setItem('Log', "0");
    this.router.navigate(['/']);

  }

  readLocalStorageValue(key) {
    return localStorage.getItem(key);
  }

}
