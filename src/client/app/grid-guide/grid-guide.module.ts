import { NgModule } from '@angular/core';
import { GridGuideComponent } from './grid-guide.component';
import { GridGuideRoutingModule } from './grid-guide-routing.module';
import { SharedModule } from '../shared/shared.module';
import { APICallerService } from '../shared/api-caller/api-caller.service';

@NgModule({
  imports: [GridGuideRoutingModule, SharedModule],
  declarations: [GridGuideComponent],
  exports: [GridGuideComponent],
  providers: [APICallerService]
})
export class GridGuideModule { }
