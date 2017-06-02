import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecordingHistoryComponent } from './recording-history.component';

const routes: Routes = [
    { path: '', component: RecordingHistoryComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RecordingHistoryRoutingModule { }
