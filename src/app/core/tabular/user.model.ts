import {ActionConfigRouteType, IActionsConfig} from '../../../modules/tabular/actions-config.interface';
import {ITabularRow} from '../../../modules/tabular/tabular-row.interface';

export class UserModel implements ITabularRow {
  public id: number;
  public usercode: string;
  public firstname: string;
  public surname: string;
  public rolename: string;
  public email: string;
  public flag: {label: string, cssClass: string};
  public active: boolean;
  public created: Date;
  public modified: Date;
  public selected: boolean;
  public checked: boolean;


  constructor(data?: any) {
    if (data) {
      Object.assign(this, data);
    }
  }

  get icon(): string{
    return (this.active) ? 'icon-check-empty is-primary' : 'icon-close-empty is-danger';
  }

  get actions(): IActionsConfig[]{
    return  [
      {
        id: 'row_person_view',
        label: 'View',
        route: ['/tabular'],
        routeType: ActionConfigRouteType.Default,
        disabledConfig: {disabled: (Math.floor(Math.random() * 2) === 1), tooltip: 'Not enough permission'}
      },
      {
        id: 'row_person_edit',
        label: 'Edit',
        routeType: ActionConfigRouteType.Callback,
        callback: [this.onActionClickHandler, 'edit', 1]
      },
      {
        id: 'row_person_delete',
        label: 'Archive',
        routeType: ActionConfigRouteType.Callback,
        callback: [this.onActionClickHandler, 'delete', 1]
      },
      {
        id: 'row_person_delete_forever',
        label: 'Delete',
        routeType: ActionConfigRouteType.Callback,
        callback: [this.onActionClickHandler, 'perm-delete', 1]
      },
      {
        id: 'row_default',
        label: '<span class="hx-icon icon-edit"></span>',
        isDefault: true,
        routeType: ActionConfigRouteType.Callback,
        callback: [this.onActionClickHandler, 'default', 1]
      }
    ];
  }

  /**
   * Function used in the callback actions
   * @param type
   * @param data
   */
  onActionClickHandler = (type, data) => {
    alert('You clicked the ' + type + ' button. Arguments:' + type + ' and ' + data);
  }
}
