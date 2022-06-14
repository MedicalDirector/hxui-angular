import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { action } from '@storybook/addon-actions';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { PagerComponent } from './pager.component';
import { PaginationComponent } from './pagination.component';
import { PaginationConfig } from './pagination.config';

export default {
  title: 'Component/Pagination',
  decorators: [
    moduleMetadata({
      imports: [CommonModule, FormsModule],
      declarations: [PagerComponent, PaginationComponent],
      providers: [PaginationConfig],
    }),
  ],
  excludeStories: /.*Data$/,
} as Meta;

const defaultArgs = {
  totalItems: 128,
  currentPage: 4,
  smallnumPages: 0,
  itemsPerPage: 10,
  maxSize: undefined,
};

const textLabelArgs = {
  previousText: '&lsaquo;',
  nextText: '&rsaquo;',
  firstText: '&laquo;',
  lastText: '&raquo;',
};

const actionsData = {
  onPagesCount: $event => {
    action('total pages updated')($event);
  },

  onPageChange: $event => {
    action('page changed')($event);
  },
};

const TemplatePagination: Story = args => {
  return {
    props: {
      ...args,
      ...actionsData,
    },
    template: `
      <hx-pagination
        [totalItems]="totalItems"
        [(ngModel)]="currentPage"
        [itemsPerPage]="itemsPerPage"
        [boundaryLinks]="boundaryLinks"
        [directionLinks]="directionLinks"
        [previousText]="previousText"
        [nextText]="nextText"
        [firstText]="firstText"
        [lastText]="lastText"
        [maxSize]="maxSize"
        [rotate]="rotate"
        (numPages)="onPagesCount($event)"
        (pageChanged)="onPageChange($event)"
      ></hx-pagination>
    `,
  };
};

export const Pagination = TemplatePagination.bind({});
Pagination.args = {
  ...defaultArgs,
  directionLinks: true,
  boundaryLinks: true,
};

export const AlternateLabels = TemplatePagination.bind({});
AlternateLabels.args = {
  ...defaultArgs,
  ...textLabelArgs,
  directionLinks: true,
  boundaryLinks: true,
};

export const Partial = TemplatePagination.bind({});
Partial.args = {
  ...defaultArgs,
  directionLinks: true,
  boundaryLinks: true,
  rotate: false,
  maxSize: 5,
};

const TemplatePaginationSimple: Story = args => {
  return {
    props: {
      ...args,
      ...actionsData,
    },
    template: `
      <hx-pager
        [totalItems]="totalItems"
        [(ngModel)]="currentPage"
        pageBtnClass="hx-button" 
        [itemsPerPage]="itemsPerPage"
        (numPages)="onPagesCount($event)"
        (pageChanged)="onPageChange($event)"
      ></hx-pager>
    `,
  };
};

export const ButtonsOnly = TemplatePaginationSimple.bind({});
ButtonsOnly.args = defaultArgs;
