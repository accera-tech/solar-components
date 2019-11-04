/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, NgZone } from '@angular/core';
import { proxyInputs, proxyMethods, proxyOutputs } from './proxies-utils';

import { Components } from '@accera/solar-components';

export declare interface AcAvatar extends Components.AcAvatar {}
@Component({ selector: 'ac-avatar', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['href', 'image', 'mode', 'subtitle', 'target', 'title'] })
export class AcAvatar {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}
proxyInputs(AcAvatar, ['href', 'image', 'mode', 'subtitle', 'target', 'title']);

export declare interface AcBadge extends Components.AcBadge {}
@Component({ selector: 'ac-badge', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['floating', 'theme'] })
export class AcBadge {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}
proxyInputs(AcBadge, ['floating', 'theme']);

export declare interface AcButton extends Components.AcButton {}
@Component({ selector: 'ac-button', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['disabled', 'expand', 'fill', 'href', 'iconOnly', 'loading', 'shape', 'size', 'target', 'theme', 'type'] })
export class AcButton {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}
proxyInputs(AcButton, ['disabled', 'expand', 'fill', 'href', 'iconOnly', 'loading', 'shape', 'size', 'target', 'theme', 'type']);

export declare interface AcCard extends Components.AcCard {}
@Component({ selector: 'ac-card', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>' })
export class AcCard {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface AcCheck extends Components.AcCheck {}
@Component({ selector: 'ac-check', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['checked', 'direction', 'disabled', 'error', 'formFieldBehavior', 'helperText', 'label', 'name', 'required', 'type', 'validator', 'validity', 'value'] })
export class AcCheck {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}
proxyMethods(AcCheck, ['getNativeFormField', 'getFormFieldBehavior']);
proxyInputs(AcCheck, ['checked', 'direction', 'disabled', 'error', 'formFieldBehavior', 'helperText', 'label', 'name', 'required', 'type', 'validator', 'validity', 'value']);

export declare interface AcDatePicker extends Components.AcDatePicker {}
@Component({ selector: 'ac-date-picker', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['altField', 'altFieldDateFormat', 'autoClose', 'classes', 'clearButton', 'dateFormat', 'dateTimeSeparator', 'disableNavWhenOutOfRange', 'disabled', 'firstDay', 'formattedValue', 'hoursStep', 'inline', 'isShowing', 'keyboardNav', 'label', 'language', 'maxDate', 'maxHours', 'maxMinutes', 'minDate', 'minHours', 'minMinutes', 'minView', 'minutesStep', 'monthsField', 'moveToOtherMonthsOnSelect', 'moveToOtherYearsOnSelect', 'multipleDates', 'multipleDatesSeparator', 'name', 'offset', 'onlyTimepicker', 'position', 'range', 'required', 'selectOtherMonths', 'selectOtherYears', 'showEvent', 'showOtherMonths', 'showOtherYears', 'startDate', 'timeFormat', 'timepicker', 'todayButton', 'toggleSelected', 'validator', 'validity', 'value', 'view', 'weekends'] })
export class AcDatePicker {
  onSelect!: EventEmitter<CustomEvent>;
  onShow!: EventEmitter<CustomEvent>;
  onHide!: EventEmitter<CustomEvent>;
  onChangeMonth!: EventEmitter<CustomEvent>;
  onChangeYear!: EventEmitter<CustomEvent>;
  onChangeDecade!: EventEmitter<CustomEvent>;
  onChangeView!: EventEmitter<CustomEvent>;
  onRenderCell!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['onSelect', 'onShow', 'onHide', 'onChangeMonth', 'onChangeYear', 'onChangeDecade', 'onChangeView', 'onRenderCell']);
  }
}
proxyMethods(AcDatePicker, ['hide', 'destroy', 'next', 'prev', 'selectDate', 'removeDate', 'clear', 'update', 'setView', 'setDate', 'getElement', 'getSelectedDates', 'getFormFieldBehavior']);
proxyInputs(AcDatePicker, ['altField', 'altFieldDateFormat', 'autoClose', 'classes', 'clearButton', 'dateFormat', 'dateTimeSeparator', 'disableNavWhenOutOfRange', 'disabled', 'firstDay', 'formattedValue', 'hoursStep', 'inline', 'isShowing', 'keyboardNav', 'label', 'language', 'maxDate', 'maxHours', 'maxMinutes', 'minDate', 'minHours', 'minMinutes', 'minView', 'minutesStep', 'monthsField', 'moveToOtherMonthsOnSelect', 'moveToOtherYearsOnSelect', 'multipleDates', 'multipleDatesSeparator', 'name', 'offset', 'onlyTimepicker', 'position', 'range', 'required', 'selectOtherMonths', 'selectOtherYears', 'showEvent', 'showOtherMonths', 'showOtherYears', 'startDate', 'timeFormat', 'timepicker', 'todayButton', 'toggleSelected', 'validator', 'validity', 'value', 'view', 'weekends']);

export declare interface AcGauge extends Components.AcGauge {}
@Component({ selector: 'ac-gauge', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['percent', 'size', 'theme'] })
export class AcGauge {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}
proxyInputs(AcGauge, ['percent', 'size', 'theme']);

export declare interface AcHeader extends Components.AcHeader {}
@Component({ selector: 'ac-header', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['scrolled', 'theme'] })
export class AcHeader {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}
proxyInputs(AcHeader, ['scrolled', 'theme']);

export declare interface AcInput extends Components.AcInput {}
@Component({ selector: 'ac-input', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['autocapitalize', 'autocomplete', 'autofocus', 'disabled', 'error', 'helperText', 'label', 'mask', 'max', 'maxlength', 'min', 'minlength', 'name', 'pattern', 'required', 'step', 'type', 'validateOnKeyup', 'validator', 'validity', 'value'] })
export class AcInput {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}
proxyMethods(AcInput, ['setValue', 'getRawValue', 'setFocus', 'getNativeFormField', 'getFormFieldBehavior']);
proxyInputs(AcInput, ['autocapitalize', 'autocomplete', 'autofocus', 'disabled', 'error', 'helperText', 'label', 'mask', 'max', 'maxlength', 'min', 'minlength', 'name', 'pattern', 'required', 'step', 'type', 'validateOnKeyup', 'validator', 'validity', 'value']);

export declare interface AcInputBase extends Components.AcInputBase {}
@Component({ selector: 'ac-input-base', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['autocapitalize', 'autocomplete', 'autofocus', 'disabled', 'error', 'label', 'max', 'maxlength', 'min', 'minlength', 'name', 'pattern', 'placeholder', 'readonly', 'required', 'size', 'step', 'theme', 'type', 'value'] })
export class AcInputBase {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}
proxyMethods(AcInputBase, ['getNativeInput', 'setFocus']);
proxyInputs(AcInputBase, ['autocapitalize', 'autocomplete', 'autofocus', 'disabled', 'error', 'label', 'max', 'maxlength', 'min', 'minlength', 'name', 'pattern', 'placeholder', 'readonly', 'required', 'size', 'step', 'theme', 'type', 'value']);

export declare interface AcLayout extends Components.AcLayout {}
@Component({ selector: 'ac-layout', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['collapsed'] })
export class AcLayout {
  contentScroll!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['contentScroll']);
  }
}
proxyInputs(AcLayout, ['collapsed']);

export declare interface AcLogin extends Components.AcLogin {}
@Component({ selector: 'ac-login', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['backgroundImageSrc'] })
export class AcLogin {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}
proxyInputs(AcLogin, ['backgroundImageSrc']);

export declare interface AcMenu extends Components.AcMenu {}
@Component({ selector: 'ac-menu', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['iconOnly', 'noResultsLabel', 'searchLabel', 'searchable', 'selected'] })
export class AcMenu {
  menuChange!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['menuChange']);
  }
}
proxyInputs(AcMenu, ['iconOnly', 'noResultsLabel', 'searchLabel', 'searchable', 'selected']);

export declare interface AcMenuItem extends Components.AcMenuItem {}
@Component({ selector: 'ac-menu-item', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['active', 'collapsed', 'disabled', 'hidden', 'href', 'iconOnly', 'submenu'] })
export class AcMenuItem {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}
proxyInputs(AcMenuItem, ['active', 'collapsed', 'disabled', 'hidden', 'href', 'iconOnly', 'submenu']);

export declare interface AcModal extends Components.AcModal {}
@Component({ selector: 'ac-modal', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['title'] })
export class AcModal {
  close!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['close']);
  }
}
proxyInputs(AcModal, ['title']);

export declare interface AcModalController extends Components.AcModalController {}
@Component({ selector: 'ac-modal-controller', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['bound'] })
export class AcModalController {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}
proxyMethods(AcModalController, ['create', 'dismiss']);
proxyInputs(AcModalController, ['bound']);

export declare interface AcNavdrawer extends Components.AcNavdrawer {}
@Component({ selector: 'ac-navdrawer', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['compact', 'theme'] })
export class AcNavdrawer {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}
proxyInputs(AcNavdrawer, ['compact', 'theme']);

export declare interface AcOverlay extends Components.AcOverlay {}
@Component({ selector: 'ac-overlay', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['backdrop', 'disableClose', 'noLayer', 'position', 'vchildren'] })
export class AcOverlay {
  backDropClick!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['backDropClick']);
  }
}
proxyMethods(AcOverlay, ['handleBackDropClick']);
proxyInputs(AcOverlay, ['backdrop', 'disableClose', 'noLayer', 'position', 'vchildren']);

export declare interface AcPagination extends Components.AcPagination {}
@Component({ selector: 'ac-pagination', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['nextLabel', 'previousLabel', 'selected', 'totalPages'] })
export class AcPagination {
  paginationChange!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['paginationChange']);
  }
}
proxyInputs(AcPagination, ['nextLabel', 'previousLabel', 'selected', 'totalPages']);

export declare interface AcPanel extends Components.AcPanel {}
@Component({ selector: 'ac-panel', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>' })
export class AcPanel {
  close!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['close']);
  }
}

export declare interface AcPanelController extends Components.AcPanelController {}
@Component({ selector: 'ac-panel-controller', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['bound'] })
export class AcPanelController {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}
proxyMethods(AcPanelController, ['create', 'dismiss']);
proxyInputs(AcPanelController, ['bound']);

export declare interface AcPopper extends Components.AcPopper {}
@Component({ selector: 'ac-popper', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['popperOptions', 'popperPivot', 'popperPlacement', 'vchildren'] })
export class AcPopper {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}
proxyInputs(AcPopper, ['popperOptions', 'popperPivot', 'popperPlacement', 'vchildren']);

export declare interface AcPortal extends Components.AcPortal {}
@Component({ selector: 'ac-portal', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['vchildren'] })
export class AcPortal {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}
proxyInputs(AcPortal, ['vchildren']);

export declare interface AcProgress extends Components.AcProgress {}
@Component({ selector: 'ac-progress', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['percent', 'theme'] })
export class AcProgress {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}
proxyInputs(AcProgress, ['percent', 'theme']);

export declare interface AcSelect extends Components.AcSelect {}
@Component({ selector: 'ac-select', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['disabled', 'error', 'fetch', 'helperText', 'label', 'loading', 'multiple', 'name', 'noResultsLabel', 'options', 'required', 'searchable', 'validator', 'validity', 'value'] })
export class AcSelect {
  selectChange!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['selectChange']);
  }
}
proxyMethods(AcSelect, ['getNativeFormField', 'getSelectedOptions', 'setValue', 'setInitialOption', 'getFormFieldBehavior']);
proxyInputs(AcSelect, ['disabled', 'error', 'fetch', 'helperText', 'label', 'loading', 'multiple', 'name', 'noResultsLabel', 'options', 'required', 'searchable', 'validator', 'validity', 'value']);

export declare interface AcShape extends Components.AcShape {}
@Component({ selector: 'ac-shape', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>' })
export class AcShape {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface AcStepper extends Components.AcStepper {}
@Component({ selector: 'ac-stepper', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['done', 'steps'] })
export class AcStepper {
  stepperChange!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['stepperChange']);
  }
}
proxyMethods(AcStepper, ['next', 'previous']);
proxyInputs(AcStepper, ['done', 'steps']);

export declare interface AcTab extends Components.AcTab {}
@Component({ selector: 'ac-tab', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['active', 'compact'] })
export class AcTab {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}
proxyInputs(AcTab, ['active', 'compact']);

export declare interface AcTable extends Components.AcTable {}
@Component({ selector: 'ac-table', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['fetch', 'loading', 'noResultsLabel', 'options', 'params', 'selectRow'] })
export class AcTable {
  changeOrder!: EventEmitter<CustomEvent>;
  tableChange!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['changeOrder', 'tableChange']);
  }
}
proxyMethods(AcTable, ['update']);
proxyInputs(AcTable, ['fetch', 'loading', 'noResultsLabel', 'options', 'params', 'selectRow']);

export declare interface AcTabs extends Components.AcTabs {}
@Component({ selector: 'ac-tabs', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['compact', 'selected', 'theme'] })
export class AcTabs {
  tabChange!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['tabChange']);
  }
}
proxyInputs(AcTabs, ['compact', 'selected', 'theme']);

export declare interface AcToast extends Components.AcToast {}
@Component({ selector: 'ac-toast', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['message', 'title', 'type'] })
export class AcToast {
  close!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['close']);
  }
}
proxyMethods(AcToast, ['close']);
proxyInputs(AcToast, ['message', 'title', 'type']);

export declare interface AcToastController extends Components.AcToastController {}
@Component({ selector: 'ac-toast-controller', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['bound'] })
export class AcToastController {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}
proxyMethods(AcToastController, ['create', 'dismiss']);
proxyInputs(AcToastController, ['bound']);

export declare interface AcToggle extends Components.AcToggle {}
@Component({ selector: 'ac-toggle', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['checked', 'direction', 'disabled', 'error', 'label', 'name', 'required', 'validator', 'validity', 'value'] })
export class AcToggle {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}
proxyMethods(AcToggle, ['getFormFieldBehavior']);
proxyInputs(AcToggle, ['checked', 'direction', 'disabled', 'error', 'label', 'name', 'required', 'validator', 'validity', 'value']);

export declare interface AcUpload extends Components.AcUpload {}
@Component({ selector: 'ac-upload', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['name', 'theme', 'uploadButtonText', 'value'] })
export class AcUpload {
  uploadFile!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['uploadFile']);
  }
}
proxyMethods(AcUpload, ['handleClick', 'removeFiles']);
proxyInputs(AcUpload, ['name', 'theme', 'uploadButtonText', 'value']);
