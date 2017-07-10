import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'generateOffset',
  pure: false
})
export class GenerateOffsetPipe implements PipeTransform {
    transform(data: any[], offsetOfKey: any): any[] {
        let pxOffset = 0;
        let currentTime: any = new Date(new Date().getTime()).toLocaleTimeString();
        let differentialHour: any = new Date().getHours() - 12;
        let differentialMins: any = new Date().getMinutes() > 30 ? 30 : 0;
        return data.filter(item => {
            if (offsetOfKey === 'timeVal') {
                item.offset = pxOffset + 'px';
                pxOffset = pxOffset + 150;
            } else if (offsetOfKey === 'start_time') {
                if (item[offsetOfKey].split(' ')[1] === currentTime.split(' ')[1]) {
                    if (differentialHour < 0) {
                        item.offset = (5*(item[offsetOfKey].split(':')[0]*60 + (differentialHour*-1)*60 - differentialMins)) + 'px';
                    } else {
                        item.offset = (5*((item[offsetOfKey].split(':')[0]*60 - differentialHour*60 - differentialMins) + (item[offsetOfKey].split(':')[1].split(' ')[0]*1))) + 'px';
                    }
                } else {
                    if (differentialHour < 0) {
                        item.offset = (5*((item[offsetOfKey].split(':')[0]*1 + 12)*60 + (differentialHour*-1)*60 - differentialMins)) + 'px';
                    } else {
                        item.offset = (5*(((item[offsetOfKey].split(':')[0]*1 + 12)*60 - differentialHour*60 - differentialMins) + (item[offsetOfKey].split(':')[1].split(' ')[0]*1))) + 'px';
                    }
                }
            }
            return data;
        });
    }
}
