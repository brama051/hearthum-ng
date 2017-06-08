import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    isActive = false;
    showMenu = '';
    profile: any;

    constructor(public auth: AuthService) {
    }

    ngOnInit() {
        if (this.auth.userProfile) {
            this.profile = this.auth.userProfile;
        } else {
            this.auth.getProfile((err, profile) => {
                this.profile = profile;
            });
        }
    }

    eventCalled() {
        this.isActive = !this.isActive;
    }

    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('push-right');
    }

}
