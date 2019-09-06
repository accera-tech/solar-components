import { Directive, ElementRef, HostListener } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { ValueAccessor } from './value-accessor';

@Directive({
  selector: 'ac-select',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SelectValueAccessor,
      multi: true
    }
  ]
})
export class SelectValueAccessor extends ValueAccessor {

  constructor(el: ElementRef) {
    super(el);
  }

  @HostListener('selectChange')
  _handleChangeEvent() {
    this.handleChangeEvent(this.el.nativeElement, this.el.nativeElement.value);
  }
}
