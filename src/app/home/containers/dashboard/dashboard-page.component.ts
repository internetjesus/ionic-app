import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-dashboard-page',
    templateUrl: './dashboard-page.component.html'
})
export class DashboardPageComponent implements OnInit {
    ngOnInit() {
        console.log('Dashboard page initialized');
    }
}
