import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-forgot-password-page',
    templateUrl: './forgot-password-page.component.html',
    styleUrls: ['./forgot-password-page.component.scss']
})
export class ForgotPasswordPageComponent implements OnInit {
    ngOnInit(): void {
        console.log('Forgot password page initialized');
    }
}
