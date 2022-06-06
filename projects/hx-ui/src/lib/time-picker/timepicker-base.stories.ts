import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Story } from '@storybook/angular';
import { HxaTime } from './hxa-time';

// eslint-disable-next-line storybook/default-exports
export const TimepickerBaseTemplate: Story = args => {
  const form = new FormGroup({
    input: new FormControl(new HxaTime(16, 0, 0)),
  });

  if (args.required) {
    form.get('input').setValidators(Validators.required);
  }

  return {
    props: {
      ...args,
      form,
    },
    template: `
      <form [formGroup]="form">
        <hxa-timepicker
          formControlName="input"
          [meridian]="meridian"
          [size]="size"
          [spinners]="spinners"
          [seconds]="seconds"
        ></hxa-timepicker>
      </form>
    `,
  };
};
