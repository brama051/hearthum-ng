import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecordingHistoryRoutingModule } from './recording-history-routing.module';
import { RecordingHistoryComponent } from './recording-history.component';

@NgModule({
  imports: [
      CommonModule,
      RecordingHistoryRoutingModule
  ],
  declarations: [RecordingHistoryComponent]
})
export class RecordingHistoryModule { }
