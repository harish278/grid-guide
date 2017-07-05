import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GridGuideComponent } from './grid-guide.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'gridguide', component: GridGuideComponent }
    ])
  ],
  exports: [RouterModule]
})
export class GridGuideRoutingModule { }
