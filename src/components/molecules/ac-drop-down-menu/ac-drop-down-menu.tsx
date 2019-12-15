import { Component, h, Host, Prop, Element, State, Watch } from '@stencil/core';
import { createControllerPortal } from '../../../behaviors/controller-behavior/create-controller-portal';
import { AcPanel } from '../../organisms/ac-panel/ac-panel';
import { AcPopper } from '../../portals/ac-popper/ac-popper';
import { ensureController } from '../../../utils/stencil/ensure-controller';
import { Bind } from '../../../utils/lang/bind';
import { FocusBehavior } from '../../../behaviors/focus-behavior';
import { AcFaIcon } from '../../utils/ac-fa-icon';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { AcDropOption } from './ac-drop-option';

@Component({
  tag: 'ac-drop-down-menu'
})
export class AcDropDownMenu {

  @Element() host: HTMLAcDropDownMenuElement;
  @Prop() options: AcDropOption[] = [];
  @Prop({ reflectToAttr: true }) value: any;


  /**
   * A reference to the ac-panel.
   */
  private selectPanel: HTMLAcPanelElement;
  private SelectPanel = createControllerPortal<AcPanel & AcPopper>(ensureController('ac-panel-controller'));

  /**
   * Flag to control input focus.
   */
  hasFocus: boolean;
  /**
   * The instance of the FocusBehavior used to close the panel when the user clicks outside.
   */
  focusBehavior = new FocusBehavior(this);
  /**
   * Flag that control the panel visibility.
   */
  @State() isPanelOpen = false;


  @Watch('isPanelOpen')
  isShowingPanelDidUpdate() {
    this.hasFocus = this.isPanelOpen;
  }
  componentDidLoad() {
    if (this.options.length === 0) {
      this.options = Array.from(this.host.querySelectorAll('ac-drop-option'))
        .map((option: any) => ({
          label: option.label || option.text,
          value: option.value,
          image: option.image
        }) as AcDropOption);
      this.value = this.options[0].value;
    }
  }

  componentDidUnload() {
    this.isPanelOpen = false;
  }
  /**
   * Toggle the panel view.
   */
  @Bind
  whenBlur(element) {
    // If the target element is'nt a child of the panel.
    if (!this.selectPanel.contains(element)) {
      if (this.isPanelOpen) {
        this.isPanelOpen = !this.isPanelOpen;
      }
    }
  }

  @Bind
  handleClick() {
    this.isPanelOpen = !this.isPanelOpen;
  }

  render() {
    const SelectPanel = this.SelectPanel;
    return <Host class={{"ac-list": true }}>
      <section style={{ display: 'none' }}>
        <slot />
      </section>
      {this.options
        .filter(x => x.value === this.value)
        .map(x => (
            <ac-button
              theme={this.isPanelOpen ? 'primary' : 'light'}
              fill="flat"
              onClick={this.handleClick}>
                {x.image && <img slot="icon-start" src={x.image} />}
                {x.label}
                {this.options.length > 0 && <AcFaIcon icon={this.isPanelOpen ? faChevronUp : faChevronDown} size={12} />}
            </ac-button>
        ))}
      <SelectPanel
        ref={selectPanel => this.selectPanel = selectPanel}
        popperPivot={this.host}
        reset={!this.isPanelOpen}>

          <ul class="ac-list">
            {this.options.map(option => (
              <ac-drop-option class="ac-list__item">
                {option.image && <img src={option.image} class="ac-drop-down__image" />}
                {option.label}
              </ac-drop-option>
            ))}
          </ul>
      </SelectPanel>
    </Host>
  }
}