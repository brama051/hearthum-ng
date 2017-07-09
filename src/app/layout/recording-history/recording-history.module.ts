import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RecordingHistoryRoutingModule} from './recording-history-routing.module';
import {RecordingHistoryComponent} from './recording-history.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CardComponent} from './components/card/card.component';
import {RepositoryService} from "../../shared/services/repository.service";

@NgModule({
    imports: [
        CommonModule,
        RecordingHistoryRoutingModule,
        NgbModule.forRoot(),

    ],
    declarations: [RecordingHistoryComponent, CardComponent],
    providers: [RepositoryService]
})
export class RecordingHistoryModule {
}
