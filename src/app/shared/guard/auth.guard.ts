import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import {AuthService} from "../services/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, public auth: AuthService) { }

    canActivate() {
        /*if (localStorage.getItem('isLoggedin')) {
            return true;
        }*/
        if (this.auth.isAuthenticated()) {
            console.log('Guard: isAuthenticated');
            return true;
        }

        this.router.navigate(['/login']);
        return false;
    }
}
