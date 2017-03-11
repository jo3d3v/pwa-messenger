/*
 * Angular bootstraping
 */
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { decorateModuleRef } from './common/environment';
/*
 * App Module
 * our top level module that holds all of our components
 */
import { AppModule } from './app/app.module';

/*
 * Bootstrap our Angular app with a top level NgModule
 */
platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .then(decorateModuleRef)
    .catch((err) => console.error(err));

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('./sw.js', { scope: '/' }).then(function (registration) {
            // TODO then case
        }).catch(function (err) {
            console.error('ServiceWorker registration failed', err);
        })
    });
}
