
/**
 * Examples for c-button.
 * Automatically generated at 5/23/2022, 5:59:55 PM.
 *
 * ⚠️ DO NOT EDIT THESE MANUALLY AS THEY WILL BE OVERWRITTEN IN THE NEXT BUILD!
 */

export const basic = `<c-button>Default</c-button>
<c-button loading>Default</c-button>
<c-button disabled>Default</c-button>`;

export const outlined = `<c-button outlined>Outlined</c-button>
<c-button outlined loading>Outlined</c-button>
<c-button outlined disabled>Outlined</c-button>`;

export const ghost = `<c-button ghost>Ghost</c-button>
<c-button ghost loading>Ghost</c-button>
<c-button ghost disabled>Ghost</c-button>`;

export const text = `<c-button text>Text</c-button>
<c-button text loading>Text</c-button>
<c-button text disabled>Text</c-button>`;

export const inverted = `<c-row gap="8" style="background-color: #006878; padding: 24px">
  <c-button inverted>Default</c-button>
  <c-button inverted loading>Default</c-button>
  <c-button inverted disabled>Default</c-button>
  <c-button inverted outlined>Outlined</c-button>
  <c-button inverted ghost>Ghost</c-button>
  <c-button inverted text>Text</c-button>
</c-row>`;

export const noRadius = `<c-button no-radius>No radius</c-button>
<c-button no-radius loading>No radius</c-button>
<c-button no-radius disabled>No radius</c-button>`;

export const fit = `<c-button fit>Fitted</c-button>
<c-button fit loading>Fitted</c-button>`;

export const icon = `<c-button>
  <i class="mdi mdi-login" slot="icon"></i>
  Login
</c-button>
<c-button loading>
  <i class="mdi mdi-login" slot="icon"></i>
  Login
</c-button>
<c-button disabled>
  <i class="mdi mdi-login" slot="icon"></i>
  Login
</c-button>`;

export const sizes = `<c-button size="small">Small</c-button>
<c-button size="small" loading>Small</c-button>
<c-button>Default</c-button>
<c-button size="large">Large</c-button>
<c-button size="large" loading>Large</c-button>`;

export const description = `<c-button>
  standard.tiny
  <div slot="description">
    <div>80 GB storage</div>
    <div>1 GB RAM | 1 CPU</div>
  </div>
</c-button>

<c-button outlined>
  standard.small
  <div slot="description">
    <div>80 GB storage</div>
    <div>2 GB RAM | 2 CPU</div>
  </div>
</c-button>

<c-button ghost>
  standard.medium
  <div slot="description">
    <div>80 GB storage</div>
    <div>4 GB RAM | 3 CPU</div>
  </div>
</c-button>

<c-button disabled>
  standard.tiny
  <div slot="description">
    <div>80 GB storage</div>
    <div>1 GB RAM | 1 CPU</div>
  </div>
</c-button>

<c-button outlined disabled>
  standard.small
  <div slot="description">
    <div>80 GB storage</div>
    <div>2 GB RAM | 2 CPU</div>
  </div>
</c-button>

<c-button ghost disabled>
  standard.medium
  <div slot="description">
    <div>80 GB storage</div>
    <div>4 GB RAM | 3 CPU</div>
  </div>
</c-button>`;

export const sizeAndDescription = `<c-button size="small">
  standard.tiny
  <div slot="description">
    <div>80 GB storage</div>
    <div>1 GB RAM | 1 CPU</div>
  </div>
</c-button>

<c-button size="small" loading>
  standard.tiny
  <div slot="description">
    <div>80 GB storage</div>
    <div>1 GB RAM | 1 CPU</div>
  </div>
</c-button>

<c-button>
  standard.small
  <div slot="description">
    <div>80 GB storage</div>
    <div>2 GB RAM | 2 CPU</div>
  </div>
</c-button>

<c-button loading>
  standard.small
  <div slot="description">
    <div>80 GB storage</div>
    <div>2 GB RAM | 2 CPU</div>
  </div>
</c-button>

<c-button size="large">
  standard.medium
  <div slot="description">
    <div>80 GB storage</div>
    <div>4 GB RAM | 3 CPU</div>
  </div>
</c-button>

<c-button size="large" loading>
  standard.medium
  <div slot="description">
    <div>80 GB storage</div>
    <div>4 GB RAM | 3 CPU</div>
  </div>
</c-button>`;