import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/compat/app';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    firebase.initializeApp(environment.firebaseConfig); 
  }

}
