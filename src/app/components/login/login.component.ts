import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from './login.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  registrandose: boolean = false;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  login(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    this.loginService.login(email, password)
      .then(() => {
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/movies';
        this.router.navigateByUrl(returnUrl);
      })
      .catch(error => {
      });
  }

  toggleRegistro() {
    this.registrandose = !this.registrandose;
  }

  registrar(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
  
    this.loginService.registrar({ email, password });
  }

  cerrarPagina() {
    this.router.navigate(['/movies']);
  }
}
