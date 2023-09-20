import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    RouterStateSnapshot
} from '@angular/router';
import { AuthService } from './auth.service';
import { RouterExtensions } from 'nativescript-angular';

@Injectable({ providedIn: 'root' })
export class LoginGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: RouterExtensions
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        //this.router.navigate(['/'])

        if (this.authService.isLoggedIn()) {
            this.authService.loadUserData();
            this.router.navigate(['/search']);
        }
        return true;
    }
}
