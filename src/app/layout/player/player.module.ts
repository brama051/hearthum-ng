import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PlayerRoutingModule} from './player-routing.module';
import {PlayerComponent} from './player.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {RepositoryService} from '../../shared/services/repository.service';
import {HttpModule} from '@angular/http';


@NgModule({
    imports: [
        CommonModule,
        PlayerRoutingModule,
        FormsModule,
        HttpModule,
        NgbModule.forRoot(),
    ],
    declarations: [PlayerComponent],
    providers: [RepositoryService]
})
export class PlayerModule {
}
