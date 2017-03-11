/*
 * Angular bootstraping
 */
import { enableProdMode } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';
import { decorateModuleRef } from './common/environment';
/*
 * App Module
 * our top level module that holds all of our components
 */
import { AppModuleNgFactory } from '../compiled/src/app/app.module.ngfactory';

/*
 * Bootstrap our Angular app with a top level NgModule
 */
export function main(): Promise<any> {
    //enableProdMode();
    return platformBrowser()
        .bootstrapModuleFactory(AppModuleNgFactory)
        .then(decorateModuleRef)
        .catch((err) => console.error(err));
}

export function bootstrap() {
    document.addEventListener('DOMContentLoaded', main);
}

bootstrap();