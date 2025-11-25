import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Scroll{
  // índice de pantalla actual: 0 = Home, 1 = WhoAmI, 2 = Services, ... 
  currentIndex: WritableSignal<number> = signal(0);

  // número total de pantallas (ajusta si cambias la cantidad)
  total = 4;

  next() {
    this.currentIndex.update(i => Math.min(this.total - 1, i + 1));
  }

  prev() {
    this.currentIndex.update(i => Math.max(0, i - 1));
  }

  isLastIndex(): boolean{
    return this.currentIndex() == (this.total-1);
  }

  goTo(index: number) {
    if (index >= 0 && index < this.total) this.currentIndex.set(index);
  }
}