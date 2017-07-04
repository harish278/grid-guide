import { FormsModule } from '@angular/forms';
import {
  async,
  TestBed
 } from '@angular/core/testing';

import { Observable } from 'rxjs/Observable';

import { HomeComponent } from './home.component';
import { APICallerService } from '../shared/api-caller/api-caller.service';

export function main() {
  describe('Home component', () => {

    beforeEach(() => {

      TestBed.configureTestingModule({
        imports: [FormsModule],
        declarations: [HomeComponent],
        providers: [
          { provide: APICallerService, useValue: new MockAPICallerService() }
        ]
      });

    });

    it('should work',
      async(() => {
        TestBed
          .compileComponents()
          .then(() => {
            let fixture = TestBed.createComponent(HomeComponent);
            let homeInstance = fixture.debugElement.componentInstance;
            let homeDOMEl = fixture.debugElement.nativeElement;
            let mockAPICallerService =
              fixture.debugElement.injector.get<any>(APICallerService) as MockAPICallerService;
            let apiCallerServiceSpy = spyOn(mockAPICallerService, 'get').and.callThrough();

            mockAPICallerService.returnValue = ['1', '2', '3'];

            fixture.detectChanges();

            expect(homeInstance.apiCallerService).toEqual(jasmine.any(MockAPICallerService));
            expect(homeDOMEl.querySelectorAll('li').length).toEqual(3);
            expect(apiCallerServiceSpy.calls.count()).toBe(1);

            homeInstance.newName = 'Minko';
            homeInstance.addName();

            fixture.detectChanges();

            expect(homeDOMEl.querySelectorAll('li').length).toEqual(4);
            expect(homeDOMEl.querySelectorAll('li')[3].textContent).toEqual('Minko');
          });

      }));
  });
}

class MockAPICallerService {

  returnValue: string[];

  get(): Observable<string[]> {
    return Observable.create((observer: any) => {
      observer.next(this.returnValue);
      observer.complete();
    });
  }
}
