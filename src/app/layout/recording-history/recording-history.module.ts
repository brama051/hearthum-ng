import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RecordingHistoryRoutingModule} from './recording-history-routing.module';
import {RecordingHistoryComponent} from './recording-history.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CardComponent} from './components/card/card.component';
import {RepositoryService} from '../../shared/services/repository.service';
import {FilterComponent} from './components/filter/filter.component';
import {FormsModule} from '@angular/forms';
import { AnalysisModalComponent } from './components/analysis-modal/analysis-modal.component';

@NgModule({
    imports: [
        CommonModule,
        RecordingHistoryRoutingModule,
        NgbModule.forRoot(),
        FormsModule
    ],
    declarations: [RecordingHistoryComponent, CardComponent, FilterComponent, AnalysisModalComponent],
    providers: [RepositoryService]
})
export class RecordingHistoryModule {
}
