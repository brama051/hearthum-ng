import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AnalyzedRecordingsRoutingModule} from './analyzed-recordings-routing.module';
import {AnalyzedRecordingsComponent} from './analyzed-recordings.component';
import {AnalysisModalComponent} from './components/analysis-modal/analysis-modal.component';
import {FilterComponent} from './components/filter/filter.component';
import {CardComponent} from './components/card/card.component';
import {RepositoryService} from '../../shared/services/repository.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        AnalyzedRecordingsRoutingModule,
        NgbModule.forRoot(),
        FormsModule
    ],
    declarations: [AnalyzedRecordingsComponent, CardComponent, FilterComponent, AnalysisModalComponent],
    providers: [RepositoryService]
})
export class AnalyzedRecordingsModule {
}
