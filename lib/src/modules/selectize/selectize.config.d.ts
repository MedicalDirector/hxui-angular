import { ISelectizeItem } from './selectize-item.interface';
export declare class SelectizeConfig {
    /**
     *  The string to separate items by. When typing an item in a multi-selection control
     *  allowing creation, then the delimiter, the item is added. If you paste
     *  delimiter-separated items in such control, the items are added at once.
     *  The delimiter is also used in the getValue API call on a text <input> tag to
     *  separate the multiple values.
     *
     *  Default: ','
     */
    delimiter: string;
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
    create: boolean;
    /**
     *  If true, when user exits the field (clicks outside of input), a new option
     *  is created and selected (if create setting is enabled).
     *
     *  Default: false
     */
    createOnBlur: boolean;
    /**
     *  Specifies a RegExp or a string containing a regular expression that the current
     *  search filter must match to be allowed to be created. May also be a predicate
     *  function that takes the filter text and returns whether it is allowed.
     *
     *  Default: null
     */
    createFilter: string;
    /**
     *  Toggles match highlighting within the dropdown menu.
     *
     *  Default: true
     */
    highlight: boolean;
    /**
     *  If false, items created by the user will not show up as available options once
     *  they are unselected.
     *
     *  Default: false
     */
    persist: boolean;
    /**
     *  Show the dropdown immediately when the control receives focus.
     *
     *  Default: true
     */
    openOnFocus: boolean;
    /**
     *  The max number of items to render at once in the dropdown list of options.
     *
     *  Default: 1000
     */
    maxOptions: number;
    /**
     *  The max number of items the user can select. 1 makes the control mono-selection,
     *  null allows an unlimited number of items.
     *
     *  Default: 1
     */
    maxItems: number;
    /**
     *  If true, the items that are currently selected will not be shown in the dropdown
     *  list of available options.
     *
     *  Default: false
     */
    hideSelected: boolean;
    /**
     *  If true, the dropdown will be closed after a selection is made.
     *
     *  Default: false
     */
    closeAfterSelect: boolean;
    /**
     *  If true, Selectize will treat any options with a "" value like normal.
     *  This defaults to false to accomodate the common <select> practice of
     *  having the first empty option to act as a placeholder.
     *
     *  Default: false
     */
    allowEmptyOption: boolean;
    /**
     *  The animation duration (in milliseconds) of the scroll animation
     *  triggered when going [up] and [down] in the options dropdown.
     *
     *  Default: 60
     */
    scrollDuration: number;
    /**
     *  The number of milliseconds to wait before requesting options from the
     *  server or null. If null, throttling is disabled. Useful when loading
     *  options dynamically while the user types a search / filter expression.
     *
     *  Default: 300
     */
    loadThrottle: number;
    /**
     *  The class name added to the wrapper element while awaiting the
     *  fulfillment of load requests.
     *
     *  Default: 'loading'
     */
    private loadingClass;
    /**
     *  The placeholder of the control (displayed when nothing is selected / typed).
     *  Defaults to input element's placeholder, unless this one is specified.
     *
     *  Default: null
     */
    private placeholder;
    /**
     *  If true, the load function will be called upon control
     *  initialization (with an empty search).
     *
     *  Default: false
     */
    preload: boolean;
    /**
     *  The element the dropdown menu is appended to. This should be 'body' or null.
     *  If null, the dropdown will be appended as a child of the Selectize control.
     *
     *  Default: null
     */
    dropdownParent: string;
    /**
     *  If true, the "Add..." option is the default selection in the dropdown.
     *
     *  Default: false
     */
    addPrecedence: boolean;
    /**
     *  If true, the tab key will choose the currently selected item.
     *
     *  Default: false
     */
    private selectOnTab;
    /**
     *  Enable or disable international character support.
     *
     *  Default: true
     */
    private diacritics;
    /**
     *  The property name of the label in the options array
     *
     *  Default: 'label'
     */
    labelField: string;
    /**
     *  The property name of the value in the options array
     *
     *  Default: 'value'
     */
    valueField: string;
    /**
     * An array of property names to analyze when filtering options.
     */
    searchField: string[];
    /**
     * Default override item render function
     */
    render: {
        item: (item: ISelectizeItem, escape: Function) => string;
    };
    /**
     *  Selectize plugins to use
     */
    private plugins;
}
