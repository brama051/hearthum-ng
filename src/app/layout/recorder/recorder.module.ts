import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RecorderRoutingModule} from './recorder-routing.module';
import {RecorderComponent} from './recorder.component';
import {SaveModalComponent} from './components/save-modal/save-modal.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {RepositoryService} from '../../shared/services/repository.service';
import {HttpModule} from '@angular/http';


@NgModule({
    imports: [
        CommonModule,
        RecorderRoutingModule,
        FormsModule,
        HttpModule,
        NgbModule.forRoot(),
    ],
    declarations: [RecorderComponent, SaveModalComponent],
    providers: [RepositoryService]
})
export class RecorderModule {
}
