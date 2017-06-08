import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AnalyzedRecordingsRoutingModule} from './analyzed-recordings-routing.module';
import {AnalyzedRecordingsComponent} from './analyzed-recordings.component';

@NgModule({
    imports: [
        CommonModule,
        AnalyzedRecordingsRoutingModule
    ],
    declarations: [AnalyzedRecordingsComponent]
})
export class AnalyzedRecordingsModule {
}
