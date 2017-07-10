import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ToolbarComponent } from './toolbar/toolbar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { APICallerService } from './api-caller/api-caller.service';
import { GenerateOffsetPipe } from './pipes/generate-offset.pipe';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [ToolbarComponent, NavbarComponent, GenerateOffsetPipe],
  exports: [ToolbarComponent, NavbarComponent,
    CommonModule, FormsModule, RouterModule, GenerateOffsetPipe]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [APICallerService]
    };
  }
}
