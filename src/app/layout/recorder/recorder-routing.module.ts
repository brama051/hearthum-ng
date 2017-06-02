import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecorderComponent } from './recorder.component';

const routes: Routes = [
    { path: '', component: RecorderComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RecorderRoutingModule { }
