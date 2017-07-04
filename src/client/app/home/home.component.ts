import { Component, OnInit } from '@angular/core';
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

    /**
     * Creates an instance of the HomeComponent with the injected
     * APICallerService.
     *
     * @param {APICallerService} APICallerService - The injected APICallerService.
     */
    constructor(public apiCaller: APICallerService) {}

    /**
     * Get the names OnInit
     */
    ngOnInit() {
        this.getNames();
    }

    /**
     * Handle the APICallerService observable
     */
    getNames() {
        this.apiCaller.getChannelsData()
            .subscribe(
                channelsData => {
                    console.log(channelsData);
                    this.channelsData = channelsData.channels;
                }, error => this.errorMessage = <any>error
            );
    }

}
