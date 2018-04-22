import {SelectizeConfig} from '../../../modules/selectize/selectize.config';
import {SelectizeCustomItemModel} from './selectize-custom-item.model';

export class SelectizeCustomConfig extends SelectizeConfig {

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
    }
  };

}
