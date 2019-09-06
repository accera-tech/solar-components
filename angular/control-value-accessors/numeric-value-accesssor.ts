import { Directive, ElementRef, HostListener } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { ValueAccessor } from './value-accessor';

@Directive({
  selector: 'ac-input[type=number], ac-input-base[type=number]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: NumericValueAccessor,
      multi: true
    }
  ]
})
export class NumericValueAccessor extends ValueAccessor {

  constructor(el: ElementRef) {
    super(el);
  }

  @HostListener('change')
  _handleChange() {
    this.handleChangeEvent(this.el.nativeElement, this.el.nativeElement.value);
  }

  registerOnChange(fn: (_: number | null) => void) {
    super.registerOnChange(value => {
      fn(value === '' ? null : parseFloat(value));
    });
  }
}
