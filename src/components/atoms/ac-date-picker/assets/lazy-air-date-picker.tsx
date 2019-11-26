import DatePicker from './air-datepicker.js';
export class LazyAirDatePicker {
  private statusPicker: 'pendinng' | 'ready'; 
  private commands: any[] = [];
  private _picker: any;
  
  constructor(baseInput: HTMLAcInputBaseElement, config: any) {
    this.selectDate = this.wrapperCommand(this.selectDate);
    this.show = this.wrapperCommand(this.show);
    this.hide = this.wrapperCommand(this.hide);
    this.destroy = this.wrapperCommand(this.destroy);
    this.next = this.wrapperCommand(this.next);
    this.prev = this.wrapperCommand(this.prev);
    this.removeDate = this.wrapperCommand(this.removeDate);
    this.clear = this.wrapperCommand(this.clear);
    this.update = this.wrapperCommand(this.update);
    this.setView = this.wrapperCommand(this.setView);
    this.setDate = this.wrapperCommand(this.setDate);

    this.loadjQuery(async () => {
      const $ = (window as any).jQuery;
      DatePicker(window, $);
      this.addEnglishTranslation($);
      this._picker = $(await baseInput.getNativeInput())
        .datepicker(config)
        .data('datepicker');
        this.commands
          .forEach(command => command());
        this.commands.length = 0;
    });
  }

  selectDate(date: Date) {
    this._picker.selectDate(date);
  }

  show() {
    this._picker.show();
  }

  hide() {
    this._picker.hide();
  }

  destroy() {
    this._picker.destroy();
  }

  next() {
    this._picker.next();
  }

  prev() {
    this._picker.prev();
  }
  
  removeDate(date: Date) {
    this._picker.removeDate(date);
  }

  clear() {
    this._picker.clear();
  }

  update(field: string, value: any) {
    this._picker.show(field, value);
  }

  setView(view: string) {
    this._picker.view = view;
  }
  
  setDate(date: Date) {
    this._picker.date = date;
  }

  getElement(): Promise<HTMLElement> {
    return this._picker.$el;
  }

  getSelectedDates(): Promise<Date[]> {
    return this._picker.selectedDates;
  }

  private wrapperCommand(cmd) {
    return (...args) => {
      if (this.statusPicker === 'pendinng') {
        this.commands.push(() => cmd.apply(this, args));
      } else {
        cmd.apply(this, args);
      }
    };
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
 
  /**
   * I dynamically load jQuery into application if it's not yet defined inside global
   * scope. This eliminates an extra step if you don't have jQuery already and if you
   * do we will just use yours.
   */
  private loadjQuery(callback: () => void) {
    const jQuery = (window as any).jQuery;
    const wrapperCallback = () => {
      this.statusPicker = "ready";
      callback();
    };
    this.statusPicker = "pendinng";
    if (!jQuery) {
      const link = 'https://code.jquery.com/jquery-3.3.1.min.js';

      const element = document.createElement('script');
      element.setAttribute('type', 'text/javascript');
      element.setAttribute('src', link);
      element.onload = wrapperCallback;
      (element as any).onreadystatechange = wrapperCallback;
      document.head.appendChild(element);
    } else {
      wrapperCallback();
    }
  }
}
