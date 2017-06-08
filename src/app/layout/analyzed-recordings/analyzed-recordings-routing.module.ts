import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AnalyzedRecordingsComponent} from './analyzed-recordings.component';

const routes: Routes = [
    {path: '', component: AnalyzedRecordingsComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AnalyzedRecordingsRoutingModule {
}
