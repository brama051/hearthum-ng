import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from './shared';
import {CallbackComponent} from './callback/callback.component';

const routes: Routes = [
    {
        path: '',
        loadChildren: './layout/layout.module#LayoutModule',
        canActivate: [AuthGuard]
    },
    {path: 'login', loadChildren: './login/login.module#LoginModule'},
    // { path: 'signup', loadChildren: './signup/signup.module#SignupModule' },
    {path: 'not-found', loadChildren: './not-found/not-found.module#NotFoundModule'},
    {path: 'callback', component: CallbackComponent},
    {path: '**', redirectTo: 'not-found'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
