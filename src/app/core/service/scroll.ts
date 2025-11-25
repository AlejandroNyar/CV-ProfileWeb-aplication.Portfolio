import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Scroll{
  currentIndex: WritableSignal<number> = signal(0);
  total: WritableSignal<number> = signal(2);


  next() {
    this.currentIndex.update(i => Math.min(this.total() - 1, i + 1));
  }

  prev() {
    this.currentIndex.update(i => Math.max(0, i - 1));
  }

  isLastIndex(): boolean{
    return this.currentIndex() == (this.total()-1);
  }

  setTotalScreens(num: number):void{
    this.total.set(num)
  }

  goTo(index: number) {
    if (index >= 0 && index < this.total()) this.currentIndex.set(index);
  }

  goToLast(){
    this.currentIndex.set(this.total()-1)
  }
}