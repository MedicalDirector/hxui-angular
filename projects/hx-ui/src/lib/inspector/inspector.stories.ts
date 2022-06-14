import { Overlay } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { action } from '@storybook/addon-actions';
import {
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  Story,
} from '@storybook/angular';
import { within } from '@storybook/testing-library';
import { Subscription } from 'rxjs';
import { InspectorLocation } from './inspector-location.enum';
import { InspectorOverlayRef } from './inspector-overlay.ref';
import { InspectorSize } from './inspector-size.enum';
import { InspectorComponent } from './inspector.component';
import { InspectorService } from './inspector.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'sb-storybook-inspector-content',
  template: `
    <div class="hx-toolbar">
      <span>Heading</span>
      <div class="hx-spacer"></div>
    </div>
    <div class="hx-toolbar">
      <span>Resize</span>
      <div class="hx-spacer"></div>
      <button class="hx-button is-flat" (click)="small()">Small</button>
      <button class="hx-button is-flat" (click)="large()">Large</button>
      <button class="hx-button is-flat" (click)="openInspector(sizeEnum.Small)">
        Open Another (SM)
      </button>
      <button class="hx-button is-flat" (click)="openInspector(sizeEnum.Large)">
        Open Another (LG)
      </button>
    </div>
  `,
  styles: [':host{ width:100% }'],
})
class StorybookInspectorContentComponent implements OnInit, OnDestroy {
  protected onClose: void;
  protected onResize: void;
  protected visitId: number;
  public sizeEnum = InspectorSize;

  private subscriptions: Subscription = new Subscription();

  constructor(
    public inspectorRef: InspectorOverlayRef,
    private inspectorService: InspectorService
  ) {}

  ngOnInit() {
    this.subscriptions.add(
      this.inspectorRef.inspectorInstance.onSlideInComplete$.subscribe(_ =>
        this.onSlideInComplete(_)
      )
    );
    this.subscriptions.add(
      this.inspectorRef.inspectorInstance.onSlideOutComplete$.subscribe(_ =>
        this.onSlideOutComplete(_)
      )
    );
    this.subscriptions.add(
      this.inspectorRef.inspectorInstance.onResizeComplete$.subscribe(_ =>
        this.onResizeComplete(_)
      )
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  close() {
    this.inspectorRef.close();
  }

  small() {
    action('change to small');
    this.inspectorRef.resize(InspectorSize.Small);
  }

  large() {
    action('change to large');
    this.inspectorRef.resize(InspectorSize.Large);
  }

  openInspector = (size: InspectorSize) => {
    this.inspectorService.open(
      StorybookInspectorContentComponent,
      {
        size: size,
        hasClose: false,
        closeOnBackdropClick: true,
      },
      {
        visitId: 11,
        onClose: (data: string) => {
          action('close')(data);
        },
        onResize: (data: string) => {
          action('resize')(data);
        },
      }
    );
  };

  onSlideInComplete(inspector) {
    action('slide-in animated')(inspector);
  }

  onSlideOutComplete(inspector) {
    action('slide-out animated finished')(inspector);
  }
  onResizeComplete(size: InspectorSize) {
    action('resize animated finished')(size);
  }
}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'sb-storybook-inspector-trigger',
  template: `
    <div
      class="wrapper"
      [ngClass]="{
        left: location === InspectorLocation.Right,
        right: location === InspectorLocation.Left
      }"
    >
      <button class="hx-button is-primary" (click)="openInspector()">
        Open inspector
      </button>
    </div>
  `,
  styles: [
    `
      .wrapper {
        display: flex;
      }
      .left {
        justify-content: flex-start;
      }
      .right {
        justify-content: flex-end;
      }
    `,
  ],
})
class StorybookInspectorTriggerComponent {
  @Input() hasClose = false;
  @Input() closeOnBackdropClick = true;
  @Input() location: InspectorLocation;

  InspectorLocation = InspectorLocation;

  constructor(private inspectorService: InspectorService) {}

  openInspector(): void {
    this.inspectorService.open(
      StorybookInspectorContentComponent,
      {
        hasClose: this.hasClose,
        closeOnBackdropClick: this.closeOnBackdropClick,
        location: this.location,
      },
      {
        visitId: 10,
        onClose: (data: string) => {
          action('close')(data);
        },
        onResize: (data: string) => {
          action('resize')(data);
        },
      }
    );
  }
}

export default {
  title: 'Component/Inspector',
  decorators: [
    moduleMetadata({
      imports: [CommonModule, BrowserAnimationsModule],
      declarations: [
        StorybookInspectorTriggerComponent,
        StorybookInspectorContentComponent,
        InspectorComponent,
      ],
      providers: [InspectorService, Overlay],
    }),
    componentWrapperDecorator(
      story => `<div style="padding:1rem; height:100vh;">${story}</div>`
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
  excludeStories: /.*Data$/,
  // argTypes: {
  //   location: getEnumOptions(InspectorLocation),
  // },
} as Meta;

const playFn = async ({ canvasElement }) => {
  // look up button that opens dialog
  const canvas = within(canvasElement);
  const button = canvas.getByRole('button');

  // open dialog
  button.click();
};

const Template: Story = args => ({
  props: {
    ...args,
  },
  template: `
    <sb-storybook-inspector-trigger
      [hasClose]="hasClose"
      [closeOnBackdropClick]="closeOnBackdropClick"
      [location]="location"
    ></sb-storybook-inspector-trigger>
  `,
});

// https://github.com/storybookjs/storybook/discussions/15602
export const PositionRight = Template.bind({});
PositionRight.args = {
  hasClose: false,
  closeOnBackdropClick: true,
  location: InspectorLocation.Right,
};
PositionRight.play = playFn;

export const PositionLeft = Template.bind({});
PositionLeft.args = {
  hasClose: false,
  closeOnBackdropClick: true,
  location: InspectorLocation.Left,
};
PositionLeft.play = playFn;

// function getEnumOptions<T>(enm: T) {
//   return {
//     options: Object.keys(enm)
//       .filter(key => !isNaN(parseInt(key)))
//       .map(key => parseInt(key)),
//     mapping: enm,
//     control: {
//       type: 'select',
//       labels: Object.values(enm).filter(value => typeof value === 'string'),
//     },
//   };
// }
