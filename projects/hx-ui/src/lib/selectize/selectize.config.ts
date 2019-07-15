import { Injectable } from '@angular/core';
import {ISelectizeItem} from './selectize-item.interface';

@Injectable()
export class SelectizeConfig  {

  /**
   * Form label text
   *
   * Default: 'Selectize Label'
   */
  label = 'Selectize Label';

  /**
   * Helper text shown on focus or error
   *
   * Default: 'Selectize help text'
   */
  help = 'Selectize help text';

  /**
   * Force caret to show.
   * Only applies to multi select.
   *
   * Default: false
   */
  hasCaret = false;

  /**
   * Mandatory boolean controls whether the * is shown in the label or not.
   * Has nothing to do with formControl.
   *
   *  * Default: false
   */
  mandatory = false;


  /**
   * Array of css class names that can be appended to the input control element
   *
   * Default: []
   */
  inputControlClasses = [];

  /**
   *  The string to separate items by. When typing an item in a multi-selection control
   *  allowing creation, then the delimiter, the item is added. If you paste
   *  delimiter-separated items in such control, the items are added at once.
   *  The delimiter is also used in the getValue API call on a text <input> tag to
   *  separate the multiple values.
   *
   *  Default: ','
   */
  delimiter = ',';

  /**
   *  Allows the user to create new items that aren't in the initial list of options.
   *  This setting can be any of the following: true, false (disabled), or a function
   *  to process input. The function can take one of two forms: synchronous
   *  (with signature function(input){} or asynchronous
   *  (with signature function(input, callback). In the synchronous case, the function
   *  should return an object for the options
   *  (eg, with defaults: return { 'value': value, 'text': text };).
   *  The asynchronous version should invoke the callback with the result in the same
   *  format as the object above (eg, callback( { 'value': value, 'text': text});)
   *
   *  Default: false
   */
  create: boolean | Function = false;

  /**
   *  If true, when user exits the field (clicks outside of input), a new option
   *  is created and selected (if create setting is enabled).
   *
   *  Default: false
   */
  createOnBlur = false;

  /**
   *  Specifies a RegExp or a string containing a regular expression that the current
   *  search filter must match to be allowed to be created. May also be a predicate
   *  function that takes the filter text and returns whether it is allowed.
   *
   *  Default: null
   */
  createFilter: string = null;

  /**
   *  Toggles match highlighting within the dropdown menu.
   *
   *  Default: true
   */
  highlight = true;

  /**
   *  If false, items created by the user will not show up as available options once
   *  they are unselected.
   *
   *  Default: false
   */
  persist = true;

  /**
   *  Show the dropdown immediately when the control receives focus.
   *
   *  Default: true
   */
  openOnFocus = true;

  /**
   *  The max number of items to render at once in the dropdown list of options.
   *
   *  Default: 1000
   */
  maxOptions = 1000;

  /**
   *  The max number of items the user can select. 1 makes the control mono-selection,
   *  null allows an unlimited number of items.
   *
   *  Default: 1
   */
  maxItems = 1;

  /**
   *  If true, the items that are currently selected will not be shown in the dropdown
   *  list of available options.
   *
   *  Default: false
   */
  hideSelected = false;

  /**
   *  If true, the dropdown will be closed after a selection is made.
   *
   *  Default: false
   */
  closeAfterSelect = false;

  /**
   *  If true, Selectize will treat any options with a "" value like normal.
   *  This defaults to false to accomodate the common <select> practice of
   *  having the first empty option to act as a placeholder.
   *
   *  Default: false
   */
  allowEmptyOption = false;

  /**
   *  The animation duration (in milliseconds) of the scroll animation
   *  triggered when going [up] and [down] in the options dropdown.
   *
   *  Default: 60
   */
  scrollDuration = 60;

  /**
   *  The number of milliseconds to wait before requesting options from the
   *  server or null. If null, throttling is disabled. Useful when loading
   *  options dynamically while the user types a search / filter expression.
   *
   *  Default: 300
   */
  loadThrottle = 300;

  /**
   *  The class name added to the wrapper element while awaiting the
   *  fulfillment of load requests.
   *
   *  Default: 'loading'
   */
  private loadingClass = 'loading';

  /**
   *  The placeholder of the control (displayed when nothing is selected / typed).
   *  Defaults to input element's placeholder, unless this one is specified.
   *
   *  Default: null
   */
  private placeholder: string = null;

  /**
   *  If true, the load function will be called upon control
   *  initialization (with an empty search).
   *
   *  Default: false
   */
  preload = false;

  /**
   *  The element the dropdown menu is appended to. This should be 'body' or null.
   *  If null, the dropdown will be appended as a child of the Selectize control.
   *
   *  Default: null
   */
  dropdownParent: string = null;

  /**
   *  If true, the "Add..." option is the default selection in the dropdown.
   *
   *  Default: false
   */
  addPrecedence = false;

  /**
   *  If true, the tab key will choose the currently selected item.
   *
   *  Default: false
   */
  private selectOnTab = false;

  /**
   *  Enable or disable international character support.
   *
   *  Default: true
   */
  private diacritics = true;

  /**
   *  The property name of the label in the options array
   *
   *  Default: 'label'
   */
  public labelField = 'label';

  /**
   *  The property name of the value in the options array
   *
   *  Default: 'value'
   */
  public valueField = 'value';

  /**
   * An array of property names to analyze when filtering options.
   */
  public searchField = ['label'];

  /**
   * Default override item render function
   */
  public render = {
    item: (item: ISelectizeItem, escape: Function): string => {
      const multi = `<span class="hx-badge is-medium">
                <span class="hx-badge-content">`
                    + escape(item.label) +
                `</span>
              </span>`;
      const single = `<div class="item">` + escape(item.label) + `</div>`;
      return (!this.maxItems) ? multi : single;
    }
  };


  /**
   *  Selectize plugins to use
   */
  private plugins = {
    'remove_button': {
      label     : '',
      title     : 'Remove',
      className : 'hx-delete',
      append    : true
    },
    'position_auto' : {}
  };

}
