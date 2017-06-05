import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecordingHistoryRoutingModule } from './recording-history-routing.module';
import { RecordingHistoryComponent } from './recording-history.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
      CommonModule,
      RecordingHistoryRoutingModule,
      NgbModule.forRoot(),

  ],
  declarations: [RecordingHistoryComponent]
})
export class RecordingHistoryModule { }
