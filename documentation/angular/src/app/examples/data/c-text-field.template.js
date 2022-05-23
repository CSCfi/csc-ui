
/**
 * Examples for c-text-field.
 * Automatically generated at 5/23/2022, 5:59:55 PM.
 *
 * ⚠️ DO NOT EDIT THESE MANUALLY AS THEY WILL BE OVERWRITTEN IN THE NEXT BUILD!
 */

export const password = `<c-text-field label="Password" type="password"></c-text-field>`;

export const disabled = `<c-text-field label="Password" type="password" disabled></c-text-field>`;

export const shadow = `<c-text-field placeholder="Text field with a shadow" shadow>
  <i class="mdi mdi-magnify" slot="pre"></i>

  <c-tag slot="post" active>12</c-tag>
</c-text-field>`;

export const textarea = `<c-text-field
  label="I am a textarea"
  placeholder="I have a placeholder text too!"
  rows="10"
  hint="Use the force Luke!"
></c-text-field>`;

export const validation = `<form [formGroup]="form">
  <c-card>
    <c-card-title>Login form</c-card-title>

    <c-card-content>
      <c-text-field
        formControlName="username"
        label="Username"
        hint="Enter your username"
        placeholder="Your superhero name"
        [valid]="isValid('username')"
        [validation]="errors('username')"
        cControl
      >
        <i class="mdi mdi-star" slot="pre"></i>
      </c-text-field>

      <c-text-field
        formControlName="age"
        label="Age"
        type="number"
        hint="Verify your age"
        placeholder="Validates only on blur"
        [valid]="isValid('age')"
        [validation]="errors('age')"
        cControl
        validate-on-blur
      ></c-text-field>

      <c-text-field
        formControlName="password"
        label="Password"
        type="password"
        hint="Enter your super secret password"
        [valid]="isValid('password')"
        [validation]="errors('password')"
        cControl
      ></c-text-field>
    </c-card-content>

    <c-card-actions>
      <c-button [disabled]="!form.valid" (click)="onSubmit()">Submit</c-button>
    </c-card-actions>
  </c-card>
</form>`;