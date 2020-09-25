import {Directive, ElementRef, EventEmitter, HostListener, Input, Output} from '@angular/core';

@Directive({
  selector: '[highlight]'
})
export class HighlightDirective {

  @Input()
  highlightColor: string;

  @Output()
  highlightOut: EventEmitter<string>;

  constructor(private el: ElementRef) {
    this.highlightOut = new EventEmitter<string>();
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.colorize(this.highlightColor);
    this.el.nativeElement.style.cursor = 'pointer';
    this.highlightOut.emit('podswietlono');
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.colorize('white');
  }

  colorize(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }

}
