import { routes } from './app.routes';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MAT_FAB_DEFAULT_OPTIONS } from '@angular/material/button';
import { provideHttpClient, withFetch } from '@angular/common/http';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }), 
        provideRouter(routes, withComponentInputBinding()),
        provideAnimationsAsync(),
        {provide: MAT_FAB_DEFAULT_OPTIONS, useValue:{subscriptSizing: 'dynamic'}},
        provideHttpClient(withFetch()),
        importProvidersFrom([SweetAlert2Module.forRoot()])
    ]
};