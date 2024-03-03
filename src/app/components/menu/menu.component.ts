import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-menu', 
  templateUrl: './menu.component.html', 
  styleUrls: ['./menu.component.scss'], 
})
export class MenuComponent{

  constructor(private _loginService: LoginService) { } 

  // Método para verificar si el usuario está logueado
  estaLogueado() {
    return this._loginService.estaLogueado();
  }

  // Método para cerrar sesión del usuario
  noLogueado() {
    return this._loginService.noLogueado();
  }
}
