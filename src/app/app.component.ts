import { Component } from '@angular/core';
import { LoginService } from './components/login/login.service';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(private _loginService: LoginService) { }

  ngOnInit(): void {
    firebase.initializeApp({
      apiKey: "AIzaSyBtv76fuAat5rZDxHrpY_BTUn78ccxNrvg",
      authDomain: "filmplex-58afc.firebaseapp.com",
    });
  }

  estaLogueado() {
    return this._loginService.estaLogueado();
  }

  noLogueado() {
    return this._loginService.noLogueado();
  }
}
