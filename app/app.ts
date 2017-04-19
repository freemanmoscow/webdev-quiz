import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
// If you want to bundle these - uncomment (results in larger file)
// import 'jquery';
// import 'materialize-css';
// import 'angular2-materialize';
import {AppModule} from './modules/app.module';

enableProdMode();

platformBrowserDynamic().bootstrapModule(AppModule)
    .catch((err: any) => console.error('Bootstrap error:', err));
