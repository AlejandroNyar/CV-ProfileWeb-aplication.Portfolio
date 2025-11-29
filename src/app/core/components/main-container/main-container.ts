import { AfterViewInit, Component, ElementRef, HostListener, inject, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Footer } from '../footer/footer';
import { HomeScreen } from '../home-screen/home-screen';
import { Contact } from '../contact/contact';
import { Scroll } from '../../service/scroll';
import { AboutScreen } from "../about-screen/about-screen";
import { ServiceScreen } from '../service-screen/service-screen';
import { PortfolioScreen } from '../portfolio-screen/portfolio-screen';

@Component({
  selector: 'app-main-container',
  imports: [Footer, HomeScreen, Contact, AboutScreen, ServiceScreen, PortfolioScreen],
  templateUrl: './main-container.html',
  styleUrl: './main-container.scss',
})
export class MainContainer implements AfterViewInit {

  @ViewChildren('sectionEl') sections!: QueryList<ElementRef<HTMLElement>>;

  public scrollSvc = inject(Scroll);
  public footerVisible: boolean = false;

  // bloqueo para evitar múltiples triggers rápidos
  private wheelLock = false;
  private touchStartY: number | null = null;

  // reactive local snapshot for template binding
  currentIndex = this.scrollSvc.currentIndex;

  
  ngAfterViewInit(): void {
    this.updateTotal();
    this.sections.changes.subscribe(() => this.updateTotal());
  }

  updateTotal(){
    this.scrollSvc.setTotalScreens(this.sections.length)
  }

  nextScreen(): void {
    if (!this.scrollSvc.isLastIndex()) {
      if (this.wheelLock) return;
      this.wheelLock = true;
      setTimeout(() => (this.wheelLock = false), 500);
      this.scrollSvc.next();
    } else {
      if (this.wheelLock) return;
      this.footerVisible = true;
      return;
    }
  }

  prevScreen(): void {
    if (this.scrollSvc.isLastIndex() && this.footerVisible) {
      if (this.wheelLock) return;
      this.footerVisible = false;
      return;
    }
    if (this.wheelLock) return;
    this.wheelLock = true;
    setTimeout(() => (this.wheelLock = false), 500);
    this.scrollSvc.prev();
  }

  get dots(): number[] {
    return Array.from({ length: this.scrollSvc.total()}, (_, i) => i);
  }

  // Rueda del ratón / trackpad
  @HostListener('wheel', ['$event'])
  onWheel(event: WheelEvent): void {
    if (event.deltaY > 10) {
      this.nextScreen();
    } else if (event.deltaY < -10) {
      this.prevScreen();
    }
  }

  @HostListener('touchstart', ['$event'])
  onTouchStart(ev: TouchEvent) {
    this.touchStartY = ev.touches?.[0]?.clientY ?? null;
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(ev: TouchEvent) {
    if (this.touchStartY == null) return;
    const endY = ev.changedTouches?.[0]?.clientY ?? 0;
    const diff = this.touchStartY - endY;
    const threshold = 40; // deslizar 40px
    if (diff > threshold) this.nextScreen();
    else if (diff < -threshold) this.prevScreen();
    this.touchStartY = null;
  }

  // Teclas de flecha
  @HostListener('window:keydown.arrowdown')
  onArrowDown(): void {
    this.nextScreen();
  }

  @HostListener('window:keydown.arrowup')
  onArrowUp(): void {
    this.prevScreen();
  }

  // Utilidad para enlazar clase de "logo pequeño"
  isHeaderLogo() {
    return this.currentIndex() > 0; // si estamos fuera de Home
  }
}
