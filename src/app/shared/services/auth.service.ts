import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import 'rxjs/add/operator/filter';
import auth0 from 'auth0-js';

@Injectable()
export class AuthService {
    auth0 = new auth0.WebAuth({
        clientID: 'NuohNPxAnOSbe2xbgMQ2wUgouEOe0Avk',
        domain: 'hearthum.eu.auth0.com',
        responseType: 'token id_token',
        audience: 'https://hearthum.eu.auth0.com/userinfo',
        redirectUri: 'https://hearthum-backend.herokuapp.com/callback',
        /*redirectUri: 'http://localhost:4200/callback',*/
        scope: 'openid profile',
        leeway: 30
    });
    userProfile: any;

    constructor(public router: Router, private route: ActivatedRoute) {
    }

    public login(): void {
        this.auth0.authorize();
    }

    public handleAuthentication(): void {
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                console.log('login success');
                window.location.hash = '';
                this.setSession(authResult);
                console.log('attempting to redirect to: /recorder');
                window.location.href = '';
            } else if (err) {
                console.log('error on handling authentication');
                this.router.navigate(['/login']);
                console.log(err);
            }
        });
    }

    private setSession(authResult): void {
        console.log('setting session');
        // Set the time that the access token will expire at
        const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expiresAt);
    }

    public logout(): void {
        // Remove tokens and expiry time from localStorage
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        // Go back to the home route
        this.router.navigate(['/login']);
    }

    public isAuthenticated(): boolean {
        // Check whether the current time is past the
        // access token's expiry time
        const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        return new Date().getTime() < expiresAt;
    }

    public getProfile(cb): void {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
            throw new Error('Access token must exist to fetch profile');
        }

        const self = this;
        this.auth0.client.userInfo(accessToken, (err, profile) => {
            if (profile) {
                self.userProfile = profile;
                console.log(profile);
            }
            cb(err, profile);
        });
    }
}
