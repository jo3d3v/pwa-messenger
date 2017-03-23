/**
 * Created by Janny on 12.02.2017.
 */

import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home.component';
import { MessagesComponent } from './pages/messages.component';
import { UserSettingsComponent } from "./pages/userSettings.component";
import { OfflineComponent } from "./pages/offline.component";

const appRoutes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'messages/:id',
        component: MessagesComponent
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

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);