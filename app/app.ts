import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {MyApp} from './components/quizapp.component';

enableProdMode();

platformBrowserDynamic().bootstrapModule(MyApp);