import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APICallerService } from '../shared/api-caller/api-caller.service';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
})
export class HomeComponent implements OnInit {

    channelsData: any;
    errorMessage: string;
    timeArray: any[] = ['7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM']

    /**
     * Creates an instance of the HomeComponent with the injected
     * APICallerService.
     *
     * @param {APICallerService} APICallerService - The injected APICallerService.
     */
    constructor(public apiCaller: APICallerService, public router: Router) {}

    /**
     * Get the names OnInit
     */
    ngOnInit() {
        // Items to load on init
    }

}
