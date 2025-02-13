import { Component, ElementRef, inject, OnInit, OnDestroy, PLATFORM_ID } from '@angular/core';
import { transition, trigger, style, animate, state } from '@angular/animations';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

interface PosElemento {
  inicial: string;
  final: string;
}

@Component({
  selector: 'div[apl-fondo-animado]',
  imports: [],
  templateUrl: './fondo-animado.component.html',
  styleUrl: './fondo-animado.component.scss',
  animations: [
    trigger('fondoAnimado', [
      state('off', style({ opacity: 0 })),
      state('on', style({ opacity: 0.5 })),
      transition('off => on', animate('0.5s ease-in-out')),
    ]),
  ]
})
export class FondoAnimadoComponent implements OnInit, OnDestroy {
  private fondoAnimado!: HTMLElement;
  private urlRuido: string = 'url("/fondo/ruido.svg")';
  private readonly document: Document = inject(DOCUMENT);
  private readonly window: (Window & typeof globalThis) | null = this.document?.defaultView;
  private readonly destroy$ = new Subject<void>();
  private platID: any = inject(PLATFORM_ID);
  private darkClassSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private darkClassChange$: Observable<boolean> = this.darkClassSubject.asObservable();
  estado: 'on' | 'off' = 'off';
  private firstClassChange: boolean = false;
  constructor(private elementRef: ElementRef) {
    const htmlElement: HTMLElement = this.document.documentElement;
    this.darkClassSubject = new BehaviorSubject<boolean>(htmlElement.classList.contains('apl-dark'));
    this.darkClassChange$ = this.darkClassSubject.asObservable();
    if (isPlatformBrowser(this.platID)) this.inicializaObserver(htmlElement);
  }
  ngOnInit(): void {
    this.fondoAnimado = this.elementRef.nativeElement.firstElementChild;
    setTimeout(() => {
      this.generaFondo();
    }, 500);
    this.darkClassChange$.subscribe((hasDarkClass: boolean) => {
      if (this.firstClassChange) {
        this.estado = 'off';
        this.generaFondo();
      } else {
        this.firstClassChange = true;
      }
    });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  private inicializaObserver(htmlElement: HTMLElement): void {
    const observer: MutationObserver = new MutationObserver((mutations) => {
      const hasClass: boolean = htmlElement.classList.contains('apl-dark');
      this.darkClassSubject.next(hasClass);
    });
    observer.observe(htmlElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    this.destroy$.subscribe(() => observer.disconnect());
  }
  private generaFondo(): void {
    const numRadiales: number = Math.floor(Math.random() * 5) + 3;
    const background: string = [this.generaRadiales(numRadiales).join(', '), this.generaLinear(), this.urlRuido].join(', ');
    this.fondoAnimado.style.backgroundImage = background;
    setTimeout(() => this.estado = 'on');
  }
  private getColor(nombre: string): string {
    const est: CSSStyleDeclaration = this.window?.getComputedStyle(this.document.body) as CSSStyleDeclaration;
    const salida: string = est.getPropertyValue('--' + nombre);
    return salida;
  }
  private generaRadiales(numRadiales: number): string[] {
    const salida: string[] = [];
    let maxTam: number = this.window ? (this.window.innerWidth < this.window.innerHeight ? this.window.innerWidth : this.window.innerHeight) : 0;
    maxTam = Math.floor(maxTam * 0.9);
    for (let num: number = 0; num < numRadiales; num++) {
      const tamCir: string = Math.floor((Math.random() * maxTam) + (maxTam * 0.1)) + 'px';
      const posCir: PosElemento = {
        inicial: Math.floor(Math.random() * 100) + '%',
        final: Math.floor(Math.random() * 100) + '%',
      };
      const claro: number = (Math.floor(Math.random() * 3) + 1) * 100;
      const oscur: number = (Math.floor(Math.random() * 3) + 7) * 100;
      const tipo: string = Math.random() < 0.5 ? 'p-primary-' : 'p-surface-';
      const colorOscur: string = this.getColor(tipo + oscur);
      const colorClaro: string = this.getColor(tipo + claro);
      const radial: string[] = [
        `radial-gradient(${tamCir} circle at ${posCir.inicial} ${posCir.final}`,
        colorOscur !== '' ? colorOscur : '#e65000',
        (colorClaro !== '' ? colorClaro : '#ffa726') + '00)'
      ];
      salida.push(radial.join(','));
    }
    return salida;
  }
  private generaLinear(): string {
    const inclina: string = Math.floor(Math.random() * 360) + 'deg';
    const claro: number = (Math.floor(Math.random() * 3) + 5) * 100;
    const oscur: number = (Math.floor(Math.random() * 3) + 7) * 100;
    const tipo: string = Math.random() < 0.55 ? 'p-primary-' : 'p-surface-';
    const colorOscur: string = this.getColor(tipo + oscur);
    const colorClaro: string = this.getColor(tipo + claro);
    return `linear-gradient(${inclina},
                            ${colorOscur !== '' ? colorOscur : '#0376bd'},
                            ${colorClaro !== '' ? colorClaro : '#e1f5fe'}00)`;
  }
}
