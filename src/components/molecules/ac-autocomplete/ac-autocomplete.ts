import { Component, Prop } from '@stencil/core';

import { AsyncDataBehavior, AsyncDataComponent, AsyncMetadata } from '../../../behaviors/async-data-behavior';
import { AcOption } from '../../../utils/types/acOption';

@Component({
  tag: 'ac-autocomplete',
})
export class AcAutocomplete implements AsyncDataComponent<AcAutocompleteParams, AcOption[]> {
  host: HTMLElement;
  asyncDataBehavior = new AsyncDataBehavior<AcAutocompleteParams, AcOption[]>(this);
  componentDidUnload: () => void;
  data: AcOption[];

  @Prop({ mutable: true })
  fetch: (params: { filter: string }) => Promise<AsyncMetadata<AcOption[]>>;

  getFetchParams: () => { filter: string };
  whenReceiveData: (metaData: AsyncMetadata<AcOption[]>) => (Promise<void> | void);

  render() {
    return null;
  }
}

interface AcAutocompleteParams {
  filter: string
}
