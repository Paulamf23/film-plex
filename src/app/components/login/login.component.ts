import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; 
import { LoginService } from '../../services/login.service'; 
import { NgForm } from '@angular/forms'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  // Propiedad para controlar si el usuario está registrándose o iniciando sesión
  registrandose: boolean = false; 

  constructor(
    private loginService: LoginService, 
    private router: Router, 
    private route: ActivatedRoute 
  ) {}

  // Método para iniciar sesión
    // Obtiene el valor del correo electrónico del formulario
    // Obtiene el valor de la contraseña del formulario
  login(form: NgForm) {
    const email = form.value.email; 
    const password = form.value.password; 

    // Llama al método login del servicio LoginService con el correo electrónico y la contraseña
    this.loginService.login(email, password)
      .then(() => {
        // Si el inicio de sesión es exitoso, navega a la URL de retorno o a la página de películas
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/movies';
        this.router.navigateByUrl(returnUrl);
      })
      .catch(error => {
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/login';
        this.router.navigateByUrl(returnUrl);
      });
  }

  // Método para alternar entre el proceso de registro e inicio de sesión
    // Cambia el valor de registrandose para alternar entre registro e inicio de sesión
  toggleRegistro() {
    this.registrandose = !this.registrandose; 
  }

  // Método para registrar un nuevo usuario
    // Obtiene el valor del correo electrónico del formulario
    // Obtiene el valor de la contraseña del formulario
    // Llama al método registrar del servicio LoginService para registrar al usuario
  registrar(form: NgForm) {
    const email = form.value.email; 
    const password = form.value.password; 
  
    this.loginService.registrar({ email, password });
  }

  // Método para cerrar la página de inicio de sesión/registro y volver a la página de películas
  cerrarPagina() {
    this.router.navigate(['/movies']); // Navega de regreso a la página de películas
  }
}
