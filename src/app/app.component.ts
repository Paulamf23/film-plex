import { Component, OnInit } from '@angular/core';
import { LoginService } from './components/login/login.service';
import { AngularFireAuth } from '@angular/fire/compat/auth'; 
import firebase from 'firebase/compat/app';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(
    private _loginService: LoginService,
    private auth: AngularFireAuth 
  ) { }

  ngOnInit(): void {
    firebase.initializeApp(environment.firebaseConfig); 
  }

  estaLogueado() {
    return this._loginService.estaLogueado();
  }

  noLogueado() {
    return this._loginService.noLogueado();
  }
}
