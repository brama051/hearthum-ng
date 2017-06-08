import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../shared/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    constructor(public router: Router, public auth: AuthService) {
        if (this.auth.isAuthenticated()) {
            this.router.navigate(['/recorder']);
        }
    }

    ngOnInit() {
    }


    onLoggedin() {
        localStorage.setItem('isLoggedin', 'true');
    }

}
