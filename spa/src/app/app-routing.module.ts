import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './routes/home/home.component';
import { MessageComponent } from './routes/message/message.component';
import { UserSettingsComponent } from './routes/user-settings/user-settings.component';
import { OfflineComponent } from './routes/offline/offline.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'message/:id',
        component: MessageComponent
    },
    {
        path: 'userSettings',
        component: UserSettingsComponent
    },
    {
        path: 'offline',
        component: OfflineComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
