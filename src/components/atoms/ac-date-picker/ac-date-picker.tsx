import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Component, Element, Event, EventEmitter, Method, Prop, h } from '@stencil/core';

import { FormFieldBehavior, FormFieldComponent } from '../../../behaviors/form-behavior';
import { Bind } from '../../../utils/lang/bind';
import { CustomValidityState, ValidatorFn } from '../../../utils/validations/validations';
import { AcFaIcon } from '../../utils/ac-fa-icon';

import DatePicker from './assets/air-datepicker.js';

@Component({
  tag: 'ac-date-picker',
  styleUrl: 'ac-date-picker.scss',
})
export class AirDatePicker implements FormFieldComponent {
  private acInputBase: HTMLAcInputBaseElement;
  private _picker: any;

  @Element() host: HTMLAcDatePickerElement;

  /**
   * The FormFieldBehavior instance.
   */
  formFieldBehavior = new FormFieldBehavior(this);

  @Prop() label = 'Date';
  @Prop() classes = '';
  @Prop() inline = false;
  @Prop() language = 'en'; // We are shipping English as a default language not Russian
  @Prop() startDate: Date = new Date();
  @Prop() firstDay = '';
  @Prop() weekends: number[] = [6, 0];
  @Prop() dateFormat = '';
  @Prop() altField = '';
  @Prop() altFieldDateFormat = '@';
  @Prop() toggleSelected = true;
  @Prop() keyboardNav = true;
  @Prop() position = 'bottom left';
  @Prop() offset = 12;
  @Prop() view = 'days';
  @Prop() minView = 'days';
  @Prop() showOtherMonths = true;
  @Prop() selectOtherMonths = true;
  @Prop() moveToOtherMonthsOnSelect = true;
  @Prop() showOtherYears = true;
  @Prop() selectOtherYears = true;
  @Prop() moveToOtherYearsOnSelect = true;
  @Prop() minDate = '';
  @Prop() maxDate = '';
  @Prop() disableNavWhenOutOfRange = true;
  @Prop() multipleDates: boolean | number;
  @Prop() multipleDatesSeparator = ', ';
  @Prop() range = false;
  @Prop() todayButton = false;
  @Prop() clearButton = false;
  @Prop() showEvent = 'focus';
  @Prop() autoClose = false;
  @Prop() monthsField = 'monthsShort';
  @Prop() timepicker = false;
  @Prop() onlyTimepicker = false;
  @Prop() dateTimeSeparator = ' ';
  @Prop() timeFormat = '';
  @Prop() minHours = 0;
  @Prop() maxHours = 24;
  @Prop() minMinutes = 0;
  @Prop() maxMinutes = 59;
  @Prop() hoursStep = 1;
  @Prop() minutesStep = 1;
  @Prop({ reflect: true }) name: string;
  @Prop({ reflect: true }) disabled: boolean;
  @Prop({ reflect: true }) required: boolean;
  @Prop({ mutable: true }) validity: CustomValidityState;
  @Prop({ mutable: true }) validator: ValidatorFn | ValidatorFn[];
  @Prop({ mutable: true }) value: Date | Date[];
  @Prop({ mutable: true }) isShowing: boolean;
  @Prop() formattedValue: string;

  @Event() onSelect!: EventEmitter;
  @Event() onShow!: EventEmitter;
  @Event() onHide!: EventEmitter;
  @Event() onChangeMonth!: EventEmitter;
  @Event() onChangeYear!: EventEmitter;
  @Event() onChangeDecade!: EventEmitter;
  @Event() onChangeView!: EventEmitter;
  @Event() onRenderCell!: EventEmitter;

  componentDidLoad() {
    /**
     * I dynamically load jQuery into application if it's not yet defined inside global
     * scope. This eliminates an extra step if you don't have jQuery already and if you
     * do we will just use yours.
     */
    this.loadjQuery(async () => {
      const $ = (window as any).jQuery;
      DatePicker(window, $);
      this.addEnglishTranslation($);
      this._picker = $(await this.acInputBase.getNativeInput())
        .datepicker({
          classes: this.classes,
          inline: this.inline,
          language: this.language,
          startDate: this.startDate,
          firstDay: this.firstDay,
          weekends: this.weekends,
          dateFormat: this.dateFormat,
          altField: this.altField,
          altFieldDateFormat: this.altFieldDateFormat,
          toggleSelected: this.toggleSelected,
          keyboardNav: this.keyboardNav,
          position: this.position,
          offset: this.offset,
          view: this.view,
          minView: this.minView,
          showOtherMonths: this.showOtherMonths,
          selectOtherMonths: this.selectOtherMonths,
          moveToOtherMonthsOnSelect: this.moveToOtherMonthsOnSelect,
          showOtherYears: this.showOtherYears,
          selectOtherYears: this.selectOtherYears,
          moveToOtherYearsOnSelect: this.moveToOtherYearsOnSelect,
          minDate: this.minDate,
          maxDate: this.maxDate,
          disableNavWhenOutOfRange: this.disableNavWhenOutOfRange,
          multipleDates: this.multipleDates,
          multipleDatesSeparator: this.multipleDatesSeparator,
          range: this.range,
          todayButton: this.todayButton,
          clearButton: this.clearButton,
          showEvent: this.showEvent,
          autoClose: this.autoClose,
          monthsField: this.monthsField,
          timepicker: this.timepicker,
          onlyTimepicker: this.onlyTimepicker,
          dateTimeSeparator: this.dateTimeSeparator,
          timeFormat: this.timeFormat,
          minHours: this.minHours,
          maxHours: this.maxHours,
          minMinutes: this.minMinutes,
          maxMinutes: this.maxMinutes,
          hoursStep: this.hoursStep,
          minutesStep: this.minutesStep,
          onSelect: this.handleSelect,
          onShow: this.handleShow,
          onHide: this.handleHide,
          onChangeMonth: (month: number, year: number) => this.onChangeMonth.emit({ month, year }),
          onChangeYear: (year: number) => this.onChangeYear.emit({ year }),
          onChangeDecade: (decade: number) => this.onChangeDecade.emit({ decade }),
          onChangeView: (view: string) => this.onChangeView.emit({ view }),
          onRenderCell: (date: Date, cellType: string) => this.onRenderCell.emit({ date, cellType })
        })
        .data('datepicker');
    });
  }

  componentDidUnload() {}

  @Bind
  async show() {
    this._picker.show();
    this.isShowing = true;
  }

  @Method()
  @Bind
  async hide() {
    this._picker.hide();
    this.isShowing = false;
  }

  @Method()
  async destroy() {
    this._picker.destroy();
  }

  @Method()
  async next() {
    this._picker.next();
  }

  @Method()
  async prev() {
    this._picker.prev();
  }

  @Method()
  @Bind
  async selectDate(date: Date) {
    this._picker.selectDate(date);
  }

  @Method()
  async removeDate(date: Date) {
    this._picker.removeDate(date);
  }

  @Method()
  async clear() {
    this._picker.clear();
  }

  @Method()
  async update(field: string, value: any) {
    this._picker.show(field, value);
  }

  @Method()
  async setView(view: string) {
    this._picker.view = view;
  }

  @Method()
  async setDate(date: Date) {
    this._picker.date = date;
  }

  @Method()
  async getElement(): Promise<HTMLElement> {
    return this._picker.$el;
  }

  @Method()
  async getSelectedDates(): Promise<Date[]> {
    return this._picker.selectedDates;
  }

  @Method()
  async getFormFieldBehavior() {
    return this.formFieldBehavior;
  }

  private loadjQuery(callback: () => void) {
    const jQuery = (window as any).jQuery;
    if (!jQuery) {
      const link = 'https://code.jquery.com/jquery-3.3.1.min.js';

      const element = document.createElement('script');
      element.setAttribute('type', 'text/javascript');
      element.setAttribute('src', link);
      element.onload = callback;
      (element as any).onreadystatechange = callback;
      document.head.appendChild(element);
    } else {
      callback();
    }
  }

  private addEnglishTranslation(jQuery: any) {
    jQuery.fn.datepicker.language['en'] = {
      days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      daysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
      months: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ],
      monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      today: 'Today',
      clear: 'Clear',
      dateFormat: 'mm/dd/yyyy',
      timeFormat: 'hh:ii aa',
      firstDay: 0
    };
    jQuery.fn.datepicker.language['pt-BR'] = {
      days: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
      daysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
      daysMin: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sa'],
      // tslint:disable-next-line:max-line-length
      months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      today: 'Hoje',
      clear: 'Limpar',
      dateFormat: 'dd/mm/yyyy',
      timeFormat: 'hh:ii',
      firstDay: 0
    };
  }

  @Bind
  handleSelect(formattedDate: string, date: Date | Date[], inst: Object) {
    this.onSelect.emit({ formattedDate, date, inst });
    this.value = date;
    this.formattedValue = formattedDate;
  }

  @Bind
  handleShow(inst: Object, animationCompleted: boolean) {
    this.onShow.emit({ inst, animationCompleted });
    this.isShowing = true;
  }

  @Bind
  handleHide(inst: Object, animationCompleted: boolean) {
    this.onHide.emit({ inst, animationCompleted });
    this.isShowing = false;
  }

  @Bind
  toggleButton() {
    if (!this.isShowing) {
      this.show();
    }
  }

  render() {
    return (
      <ac-input-base
        label={this.label}
        ref={acInputBase => this.acInputBase = acInputBase as HTMLAcInputBaseElement}
        value={this.formattedValue}
        name={this.name}
        disabled={this.disabled}
        required={this.required}
      >
        <ac-button
          slot="item-end"
          theme={this.isShowing ? 'primary' : 'light'}
          fill="flat"
          onClick={this.toggleButton}
          icon-only
        >
          <AcFaIcon icon={faCalendarAlt} size={14} />
        </ac-button>
      </ac-input-base>
    );
  }
}
