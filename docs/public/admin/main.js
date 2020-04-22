class NetlifyCMS {
  PREVIEW_STYLES = `
    html, body {
      color: #444;
      font-size: 14px;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }
    body {
      padding: 20px;
    }
    h1 {
      margin-top: 20px;
      color: #666;
      font-weight: bold;
      font-size: 32px;
    }
    img {
      max-width: 100%;
    }
    iframe {
      min-width: 100%;
      height: 500px;
      border: 1px solid #E6E6E6;
      background: #FFFFFF;
    }
  `;

  get mode() { return this._mode };
  set mode(value) {
    if (value === 'VIEW') {
      this.toggleEditIcon.classList.replace('fa-edit', 'fa-eye');
      this.docRoot.style.display = 'none';
      this.ncRoot.style.display = '';
    } else {
      this.toggleEditIcon.classList.replace('fa-eye', 'fa-edit');
      this.docRoot.style.display = '';
      this.ncRoot.style.display = 'none';
    }
    this._mode = value;
  };

  constructor() {
    this.toggleEditButton = document.getElementById('toggleEditButton');
    this.toggleEditIcon = document.getElementById('toggleEditIcon');
    this.docRoot = document.getElementById('root');
    this.ncRoot = document.getElementById('nc-root');

    window.CMS.registerPreviewStyle(this.PREVIEW_STYLES, { raw: true });
    registerAdobeXDComponent(window.CMS);
    registerImportsComponent(window.CMS);
    this.toggleEditButton.addEventListener('click', this.toggleEdit.bind(this));
  }

  toggleEdit() {
    this.mode = this.mode === 'VIEW' ? 'EDIT' : 'VIEW';
  }
}

function registerAdobeXDComponent(CMS) {
  CMS.registerEditorComponent({
    id: 'adobexd',
    label: 'AdobeXD',
    fields: [{name: 'url', label: 'AdobeXD Preview URL', widget: 'string'}],
    pattern: /^<AdobeXDPreview url={"(.+)"} \/>$/,
    fromBlock: match => ({ url: match[1] }),
    toBlock: obj => `<AdobeXDPreview url={"${obj.url}"} />`,
    toPreview: obj => `<iframe src="${obj.url.replace('view', 'embed')}"></iframe>"`,
  });
}

function registerImportsComponent(CMS) {
  CMS.registerEditorComponent({
    id: 'imports',
    label: 'Imports',
    fields: [{name: 'code', label: 'Import Code', widget: 'text', default: `
import { Playground } from 'docz';
import { JSCodeBlock } from '@components/JSCodeBlock';
import { AdobeXDPreview } from '@components/AdobeXDPreview';
import { defineCustomElements } from '@accera/solar-components.core/dist/loader';
defineCustomElements(window);
`}],
    pattern: /\/\/ JSXIMPORTS(.+)\/\/ END JSXIMPORTS/gms,
    fromBlock: match => ({ code: match[1] }),
    toBlock: obj => `// JSXIMPORTS${obj.code}// END JSXIMPORTS`,
    toPreview: obj => '',
  });
}

new NetlifyCMS();
