import { Injectable, signal, WritableSignal } from '@angular/core';
import { SectionItem } from '../model/sectionItem';

@Injectable({ providedIn: 'root' })
export class Scroll{
  currentIndex: WritableSignal<number> = signal(0);
  total: WritableSignal<number> = signal(2);
  targetSection = signal<string>('home');

  sections : SectionItem[] = [
    { label: 'Home' , sectionName : 'home'},
    { label: 'Who am I', sectionName : 'about'},
    { label: 'Services', sectionName : 'service'},
    //{ label: 'Work', sectionName : 'portfolio'}, //disabled until portfolio
    { label: 'Contact', sectionName : 'contact'},
  ];

  goToSection(idName: string) {
    let section = this.sections.find((section) => section.sectionName.toLowerCase() === idName.toLowerCase()) 
    if(section){
      this.targetSection.set(idName);
      this.currentIndex.set(this.sections.indexOf(section));
    }else{
      console.error(idName, section)
    }
  }

  next(): void{
    this.currentIndex.update(i => Math.min(this.total() - 1, i + 1));
  }

  prev(): void{
    this.currentIndex.update(i => Math.max(0, i - 1));
  }

  isLastIndex(): boolean{
    return this.currentIndex() == (this.total()-1);
  }

  setTotalScreens(num: number): void{
    this.total.set(num)
  }

  goTo(index: number): void{
    if (index >= 0 && index < this.total()) this.currentIndex.set(index);
  }

  getSections(): SectionItem[]{
    return this.sections;
  }

  goToLast(): void{
    this.currentIndex.set(this.total()-1)
  }
}