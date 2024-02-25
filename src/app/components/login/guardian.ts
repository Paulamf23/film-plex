import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { LoginService } from "./login.service";

@Injectable()
export class LoginGuardian implements CanActivate {
    constructor(private loginService: LoginService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.loginService.estaLogueado()) {
            return true;
        } else {
            this.router.navigate(['/movies'], { queryParams: { returnUrl: state.url }});
            return false;
        }
    }
}
