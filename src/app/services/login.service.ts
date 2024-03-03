import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import { CookieService } from "ngx-cookie-service";


@Injectable()
export class LoginService {
    constructor(private router: Router, private cookie: CookieService) {}

    token!: string; 
    registrandose: boolean = false; 

    // Método para iniciar sesión
    login(email: string, password: string): Promise<void> {
        return new Promise((resolve, reject) => {
            // Iniciar sesión con Firebase Authentication
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then(response => {
                    // Obtener el token de autenticación del usuario
                    firebase.auth().currentUser?.getIdToken().then(
                        token => {
                            // Almacenar el token en las cookies
                            this.token = token;
                            this.cookie.set("token", token);
                            resolve(); 
                        }
                    );
                })
                .catch(error => {
                    this.handleAuthenticationError(error);
                    reject(error); 
                });
        });
    }

    // Método para obtener el token de autenticación del usuario desde las cookies
    getIdToken() {
        return this.cookie.get("token");
    }

    // Método para verificar si el usuario está autenticado
    estaLogueado() {
        return this.cookie.get("token");
    }

    // Método para cerrar la sesión del usuario
    noLogueado() {
        // Cerrar sesión con Firebase Authentication y redirigir al usuario a la página principal
        firebase.auth().signOut().then(() => {
            this.token = ""; 
            this.cookie.set("token", this.token); 
            this.router.navigate(['/']); 
        });
    }

    // Método para cambiar entre el proceso de registro e inicio de sesión
    toggleRegistro() {
        this.registrandose = !this.registrandose;
    }

    // Método para registrar un nuevo usuario
    registrar(credentials: { email: string, password: string }) {
        if (!this.isValidPassword(credentials.password)) {
            // Validar la contraseña y mostrar una alerta si no cumple con los requisitos
            alert("El formato de la contraseña no es el esperado.");
            return;
        }

        // Registrar un nuevo usuario con Firebase Authentication
        firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password)
            .then(response => {
                // Obtener el token de autenticación del usuario registrado
                firebase.auth().currentUser?.getIdToken().then(
                    token => {
                        // Almacenar el token en las cookies
                        this.token = token;
                        this.cookie.set("token", token);
                        this.router.navigate(['/movies']); 
                    }
                );
            })
            .catch(error => {
                // Manejar errores de autenticación durante el registro
                this.handleAuthenticationError(error);
            });
    }

    // Método para validar la longitud de la contraseña
    private isValidPassword(password: string): boolean {
        const minLength = 6;
        return password.length >= minLength;
    }

    // Método para manejar errores de autenticación
    private handleAuthenticationError(error: any) {
        let errorMessage = "Algo no salió bien!";
        let especific = "Comprueba el correo o la contraseña";

        // Mostrar una alerta con el mensaje de error
        alert(errorMessage + "\n" + especific);
    }
}
