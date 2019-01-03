import { animate, wait } from './animation';

export class TransitionLogic {
  component: TransitionComponent;

  constructor(component: TransitionComponent) {
    this.component = component;

    // Mokeypatch componentWillLoad.
    // This function NOT will wait for transitions.
    this.component._componentWillLoad = this.component.componentWillLoad;
    this.component.componentWillLoad = function () {
      this.host.classList.add('transition--initial');
      if (this._componentWillLoad) return this._componentWillLoad();
    };

    // Monkeypatch componentDidLoad.
    this.component._componentDidLoad = this.component.componentDidLoad;
    this.component.componentDidLoad = async function () {
      if (this._componentDidLoad) this._componentDidLoad.apply(this);
      if (this.componentWillEnter) await this.componentWillEnter();
      this.host.classList.replace('transition--initial', 'transition--entered');


      // Monkeypatch native Element#remove.
      // This function will wait for transitions.
      this.host.remove = async () => {
        this.host.classList.add('transition--will-leave');

        if (this.componentWillLeave) await this.componentWillLeave();
        await animate(this.host).then(wait());
        Element.prototype.remove.apply(this.host);
      };
    };
  }
}

export interface TransitionComponent {
  host: HTMLElement;
  transitionLogic: TransitionLogic;

  componentWillEnter?: () => Promise<any> | void;
  componentWillLeave?: () => Promise<any> | void;

  _componentWillLoad?: () => Promise<any> | void;
  componentWillLoad?: () => Promise<any> | void;
  _componentDidLoad?: Function;
  componentDidLoad?: Function;
}
