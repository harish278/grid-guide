import { Component, OnInit } from '@angular/core';
import { APICallerService } from '../shared/api-caller/api-caller.service';

/**
 * This class represents the lazy loaded GridGuideComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-grid-guide',
  templateUrl: 'grid-guide.component.html',
  styleUrls: ['grid-guide.component.css'],
})
export class GridGuideComponent implements OnInit {

    channelsData: any;
    errorMessage: string;
    timeArray: any[] = ['7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM']

    /**
     * Creates an instance of the GridGuideComponent with the injected
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
