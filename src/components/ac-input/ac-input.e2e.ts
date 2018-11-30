import { newE2EPage } from '@stencil/core/testing';

describe('ac-input', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<ac-input></ac-input>');
    const element = await page.find('ac-input');
    expect(element).toHaveClass('hydrated');
  });
});
