import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RecorderRoutingModule} from './recorder-routing.module';
import {RecorderComponent} from './recorder.component';

@NgModule({
    imports: [
        CommonModule,
        RecorderRoutingModule
    ],
    declarations: [RecorderComponent]
})
export class RecorderModule {
}
