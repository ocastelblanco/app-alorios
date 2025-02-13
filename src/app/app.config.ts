import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { definePreset, palette } from '@primeng/themes';
import Aura from '@primeng/themes/aura';

const primaryColor: any = palette('{purple}');
const preset: any = definePreset(Aura, {
  semantic: {
    primary: primaryColor,
  }
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),
    provideAnimations(),
    providePrimeNG({
      ripple: true,
      theme: {
        preset: preset,
        options: {
          darkModeSelector: '.apl-dark'
        },
      }
    }),
  ]
};
