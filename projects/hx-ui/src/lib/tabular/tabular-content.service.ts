import { IWithTooltip } from '../../../../../lib/lib/tabular/tabular-tooltip.interface';
import { Injectable } from '@angular/core';

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
