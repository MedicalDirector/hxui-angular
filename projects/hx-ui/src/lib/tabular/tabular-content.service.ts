import { Injectable } from '@angular/core';
import { IWithTooltip } from './tabular-tooltip.interface';

@Injectable()
export class TabularContentService {

  private isTypeofIWithTooltip(arg) {
    return !!arg && !!arg.tooltip;
  }

  getContent(cellContent: any|IWithTooltip): any {
    if (this.isTypeofIWithTooltip(cellContent)) {
      return cellContent.content;
    } 

    return cellContent as any;
  }

  getTooltipInfo(cellContent: any|IWithTooltip) {
    if (this.isTypeofIWithTooltip(cellContent)) {
      return cellContent.tooltip;
    }

    return {
      config: {
        disabled: true
      },
      content: ''
    };
  }
}
