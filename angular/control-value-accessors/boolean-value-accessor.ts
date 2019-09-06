import { Directive, ElementRef, HostListener } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { ValueAccessor, setIonicClasses } from './value-accessor';

@Directive({
  selector: 'ac-check',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: BooleanValueAccessor,
      multi: true
    }
  ]
})
export class BooleanValueAccessor extends ValueAccessor {
  constructor(el: ElementRef) {
    super(el);
  }

  writeValue(value: any) {
    this.el.nativeElement.checked = this.lastValue = value == null ? false : value;
    setIonicClasses(this.el);
  }

  @HostListener('change')
  _handleChange() {
    this.handleChangeEvent(this.el.nativeElement, this.el.nativeElement.checked);
  }
}
