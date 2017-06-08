import {Component, OnInit} from '@angular/core';
import {AuthService} from '../shared/services/auth.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-callback',
    templateUrl: './callback.component.html',
    styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {

    constructor(public auth: AuthService, public router: Router) {
        if (auth.isAuthenticated()) {
            router.navigate(['']);
        } else {
            auth.handleAuthentication();
        }
    }

    ngOnInit() {
    }

}
