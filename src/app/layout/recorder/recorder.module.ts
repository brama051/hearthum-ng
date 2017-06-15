import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RecorderRoutingModule} from './recorder-routing.module';
import {RecorderComponent} from './recorder.component';
import {SaveModalComponent} from './components/save-modal/save-modal.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
    imports: [
        CommonModule,
        RecorderRoutingModule,
        NgbModule.forRoot(),
    ],
    declarations: [RecorderComponent, SaveModalComponent]
})
export class RecorderModule {
}
