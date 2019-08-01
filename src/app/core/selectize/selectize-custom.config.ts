import {SelectizeConfig} from '../../../../projects/hx-ui/src/lib/selectize/selectize.config';
import {SelectizeCustomItemModel} from './selectize-custom-item.model';
import {ISelectizeItem} from '../../../../projects/hx-ui/src/lib/selectize/selectize-item.interface';

export class SelectizeCustomConfig extends SelectizeConfig {

  public hasCaret = true;

  public render = {
    item: (item: SelectizeCustomItemModel, escape: Function): string => {

      const cssClass = (item.error) ? 'is-danger' : '';
      const info = (item.info) ? '<button class="mr-2 hx-info is-small" title="For now via the render function, only native tooltips are possible :("></button>' : '';
      const multi = `<span class="hx-badge is-medium ` + cssClass + `">
                <span class="hx-badge-content">`
        + info
        + escape(item.label) +
        `</span>
              </span>`;
      const single = `<div class="item">` + escape(item.label) + `</div>`;
      return (!this.maxItems) ? multi : single;
    },
    option: (item: ISelectizeItem|any, escape: Function): string => {
      return `<div class="option ${item.disabled ? 'disabled' : ''}">` + escape(item.label) + `</div>`;
    }
  };

}
