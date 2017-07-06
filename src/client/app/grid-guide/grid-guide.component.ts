import { Component, OnInit, AfterViewInit } from '@angular/core';
import { APICallerService } from '../shared/api-caller/api-caller.service';

declare var $: any;

/**
 * This class represents the lazy loaded GridGuideComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-grid-guide',
  templateUrl: 'grid-guide.component.html',
  styleUrls: ['grid-guide.component.css'],
})
export class GridGuideComponent implements OnInit, AfterViewInit {

    channelsData: any;
    errorMessage: string;
    currentTime: any = new Date(new Date().getTime()).toLocaleTimeString();
    differentialHour: any = new Date().getHours() > 12 ? new Date().getHours() - 12 : new Date().getHours() - 12;
    differentialMins: any = new Date().getMinutes() > 30 ? 30 : 0;
    timeArray: any[];
    // timeArray: any[] = ['0:00 AM', '0:30 AM', '1:00 AM', '1:30 AM', '2:00 AM', '2:30 AM', '3:00 AM', '3:30 AM',
    //                     '4:00 AM', '4:30 AM', '5:00 AM', '5:30 AM', '6:00 AM', '6:30 AM', '7:00 AM',
    //                     '7:30 AM', '8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM', '10: 00 AM', '10:30 AM',
    //                     '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM',
    //                     '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM',
    //                     '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM',
    //                     '9:30 PM', '10:00 PM', '10:30 PM', '11: 00 PM', '11:30 PM']
    // timeArray: any[] = ['7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM', '10:00 PM', '10:30 PM'];

    /**
     * Creates an instance of the GridGuideComponent with the injected
     * APICallerService.
     *
     * @param {APICallerService} APICallerService - The injected APICallerService.
     */
    constructor(public apiCaller: APICallerService) {
        let timeInMins = ((new Date().getHours()) * 60) + ((new Date().getMinutes() > 30 ? 30 : 0));
        this.generatetimesArray(timeInMins);
    }

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

    ngAfterViewInit() {
        let self = this;
        // To get the scroll position since we take 5px per minute.
        // let currentTimeScrollValue = ((+(new Date().getHours()) * 60) + (+(new Date().getMinutes() > 30 ? 30 : 0)))*5;
        // setTimeout(function () {
        //     console.log(currentTimeScrollValue);
        //     console.log($('#programs-schedule'));
        //     $('#programs-schedule').scrollLeft(currentTimeScrollValue);
        // }, 30);
    }

    // @params startTime - start time value in minutes
    generatetimesArray (startTime: number) {
        let interval = 30; //minutes interval
        let times = []; // time array
        let ap = ['AM', 'PM']; // AM-PM

        //loop to increment the time and push results in array
        for (let i=0;startTime<24*60; i++) {
            let hh = Math.floor(startTime/60); // getting hours of day in 0-24 format
            let mm = (startTime%60); // getting minutes of the hour in 0-55 format
            times[i] = ("0" + (hh % 12)).slice(-2) + ':' + ("0" + mm).slice(-2) + ap[Math.floor(hh/12)]; // pushing data in array in [00:00 - 12:00 AM/PM format]
            startTime = startTime + interval;
        }
        this.timeArray = times;
    }
}
