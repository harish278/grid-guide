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
    // timeArray: any[] = ['0:30 AM', '1:00 AM', '1:30 AM', '2:00 AM', '2:30 AM', '3:00 AM', '3:30 AM',
    //                     '4:00 AM', '4:30 AM', '5:00 AM', '5:30 AM', '6:00 AM', '6:30 AM', '7:00 AM',
    //                     '7:30 AM', '8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM', '10: 00 AM', '10:30 AM',
    //                     '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM',
    //                     '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM',
    //                     '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM',
    //                     '9:30 PM', '10:00 PM', '10:30 PM', '11: 00 PM', '11:30 PM', '0:00 AM']
    timeArray: any[] = ['7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM', '10:00 PM', '10:30 PM'];

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
        this.getChannelsData();
    }

    /**
     * Handle the APICallerService observable
     */
    getChannelsData() {
        this.apiCaller.getChannelsData()
            .subscribe(
                channelsData => {
                    console.log(channelsData);
                    this.channelsData = channelsData.channels;
                }, error => this.errorMessage = <any>error
            );
    }

    toggleLiked(channelIndex: number) {
        this.channelsData[channelIndex].is_liked = !this.channelsData[channelIndex].is_liked;
    }

}
