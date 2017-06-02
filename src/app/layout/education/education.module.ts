import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EducationRoutingModule } from './education-routing.module';
import { EducationComponent } from './education.component';

@NgModule({
  imports: [
      CommonModule,
      EducationRoutingModule
  ],
  declarations: [EducationComponent]
})
export class EducationModule { }
