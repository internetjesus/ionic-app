import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-profile-page',
    templateUrl: './profile-page.component.html'
})
export class ProfilePageComponent implements OnInit {
    ngOnInit() {
        console.log('Profile page initialized');
    }
}
