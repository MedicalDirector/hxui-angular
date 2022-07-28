# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [13.0.0](https://github.com/MedicalDirector/hxui-angular/compare/v11.2.1...13.0.0) - 2022-07-29

_If you are upgrading: please see [`MIGRATION.md`](MIGRATION.md)._

### Changed

- add support for Angular 13
- **BREAKING:** bump angular peer deps to >=8.x
- **BREAKING:** bump ng-select/ng-select peer dep to >=8.x
- **BREAKING:** bump ngx-mask peer dep to >=13.x
- **BREAKING:** bump rxjs peer dep to >=7.4.x
- **BREAKING:** bump ngx-toastr peer dep to >=14.x
- **BREAKING:** refactor date picker component
- **BREAKING** remove Selectize component
- **BREAKING** remove peer dependency for selectize, jquery and @angular/platform-browser-dynamic
- **BREAKING** remove peer dependency for moment, array-sort-by, lodash and lodash.clonedeep and convert to project dependency

### Fixed

- [Date picker] Fixed styling for input with leading icon and dropdown overlay in incrementally-adopted hxui usage

## [11.2.1](https://github.com/MedicalDirector/hxui-angular/compare/v11.2.0...v11.2.1) - 2022-06-06

### Added

- Baseline visual tests for all components ([fad826d](https://github.com/MedicalDirector/hxui-angular/commit/fad826d329498e67c57122930520a4d1fe47312a))

### Fixed

- [Accordion, Inspector, Table, Timepicker, Toaster] Remove redundantly-added, lazy-load-blocking modules ([638f30e](https://github.com/MedicalDirector/hxui-angular/commit/638f30e5a929296d97494466814bf661cc36ca2b), [#15](https://github.com/MedicalDirector/hxui-angular/issues/15))

- [Selectize] Fix delete icon styling for multi-select ([945960f](https://github.com/MedicalDirector/hxui-angular/commit/945960f9a578b865669809b0739c6b161c4e1284))
- [Positioning, Typeahead] Update deprecated types and add typings ([e79b114](https://github.com/MedicalDirector/hxui-angular/commit/e79b114dd1eaa2a68d0411d3c1b097be8c9e590e))

## [11.2.0](https://github.com/MedicalDirector/hxui-angular/compare/v11.1.1...v11.2.0) - 2022-04-29

### Added

- [Filters] Add support for date range ([30d17dd](https://github.com/MedicalDirector/hxui-angular/commit/30d17dd76eea1da2c7c9e11b4839c7f44447ee0f))
- [Date Range Picker] Add support for conditional rendering of caret and placeholder; and default dates ([7dc5507](https://github.com/MedicalDirector/hxui-angular/commit/7dc5507a030b2520046462f40a856ed890b5cf2e))

### Fixed

- [Date picker] Fix touched state issue ([556383a](https://github.com/MedicalDirector/hxui-angular/commit/556383a83938cf7df32f13cd16012b456319c6bf))

## [11.1.1](https://github.com/MedicalDirector/hxui-angular/compare/v11.1.0...v11.1.1) - 2022-03-15

### Fixed

- [Date range picker] Prevent selection of date range where date is null or from later than to ([b8a9b12](https://github.com/MedicalDirector/hxui-angular/commit/b8a9b12c52ad8f4f4f335b942fc025ccb78a5f7d))

## [11.1.0](https://github.com/MedicalDirector/hxui-angular/compare/v11.0.21...v11.1.0) - 2022-03-08

### Added

- [Tabular] Add support to replace column labels with html

### Fixed

- [Inspector] Fix issue with hasClose param and left-anchored styling

## [11.0.21](https://github.com/MedicalDirector/hxui-angular/compare/v11.0.20...v11.0.21) - 2021-11-24

### Added

- [Inspector] Add event on backdrop click (onBackDropClick$)

## [11.0.20](https://github.com/MedicalDirector/hxui-angular/compare/v11.0.19...v11.0.20) - 2021-11-17

### Added

- [Inspector] Add config to disable backdrop click

## [11.0.16, 11.0.17, 11.0.18, 11.0.19](https://www.npmjs.com/package/@hxui/angular/v/11.0.16) (2021-09-26)

### Bugfix

- **Datepicker:** fixed issue with 30th of Feb rolling over (normalising) to the 1st of march
- **Datepicker:** Added \* to label when required attribute = true

## [11.0.15](https://www.npmjs.com/package/@hxui/angular/v/11.0.15) (2021-05-24)

### Bugfix

- **Datepicker:** fixed issue with touched state

## [11.0.12 - 11.0.13 - 11.0.14](https://www.npmjs.com/package/@hxui/angular/v/11.0.12) (2021-04-26)

### New component

- **Toastr:** added 3rd party toastr component with hxui theme

## [11.0.11](https://www.npmjs.com/package/@hxui/angular/v/11.0.11) (2021-03-18)

### Enhancement

- **Date picker:** added help text visible and is warning inputs

## [11.0.10](https://www.npmjs.com/package/@hxui/angular/v/11.0.10) (2021-03-11)

### Bugfix

- **Filters:** Fix issue with 'ALL' label when single filter only has 2 or less options

## [11.0.9](https://www.npmjs.com/package/@hxui/angular/v/11.0.9) (2021-02-15)

### Bugfix

- **Inspector:** Fix for dynamic width and orientation change

## [11.0.8](https://www.npmjs.com/package/@hxui/angular/v/11.0.8) (2020-12-22)

### New component

- **Timepicker:** Add time picker component

## [11.0.7](https://www.npmjs.com/package/@hxui/angular/v/11.0.7) (2020-12-22)

### Enhancement

- **Inspector:** Add config option to remove close button

## [11.0.6](https://www.npmjs.com/package/@hxui/angular/v/11.0.6) (2020-12-18)

### Enhancement

- **Dialog:** Added config option to disable backdrop click

## [11.0.5](https://www.npmjs.com/package/@hxui/angular/v/11.0.5) (2020-12-18)

### Enhancement

- **Online status:** Added additional observable to indicate online status

## [11.0.3-11.0.4](https://www.npmjs.com/package/@hxui/angular/v/11.0.4) (2020-12-15)

### Bugfix

- **Dialog:** Fixed dependency injection issue with dialog overlay ref
- **Inspector:** Fixed dependency injection issue with inspector overlay ref

## [11.0.2](https://www.npmjs.com/package/@hxui/angular/v/11.0.2) (2020-12-09)

### Enhancement

- **Date picker:** Added support for a month view in the date picking workflow

## [11.0.0-11.0.1](https://www.npmjs.com/package/@hxui/angular/v/11.0.1) (2020-12-03)

### Angular Upgrade (Breaking Change)

- **UPGRADE:** Upgraded Angular to version 11 and all its dependencies

## [8.3.0-8.3.1](https://www.npmjs.com/package/@hxui/angular/v/8.3.1) (2020-02-27)

### Enhancement (Breaking Change)

- **Filters:** Added multi select filter type

## [8.2.18](https://www.npmjs.com/package/@hxui/angular/v/8.2.18) (2020-10-01)

### Enhancement

- **Date picker:** Added the ability to browse years

## [8.2.16 - 8.2.17](https://www.npmjs.com/package/@hxui/angular/v/8.2.17) (2020-09-30)

### Enhancement

- **empty state:** Added support for content transclusion
- **inspector:** Added height:100% to portalHost class for mobile support

## [8.2.15](https://www.npmjs.com/package/@hxui/angular/v/8.2.15) (2020-09-03)

### Enhancement

- **inspector:** Added location config option to slide in inspector from left or right

## [8.2.14](https://www.npmjs.com/package/@hxui/angular/v/8.2.14) (2020-06-29)

### Enhancement

- **typeahead:** Added hxaHighlight component to take care of highlighted results in custom templates

## [8.2.13](https://www.npmjs.com/package/@hxui/angular/v/8.2.13) (2020-06-29)

### Bugfix

- **ng-select:** Added ngHighlight module and updated styles

## [8.2.12](https://www.npmjs.com/package/@hxui/angular/v/8.2.12) (2020-03-16)

### Bugfix

- **Tabular:** Fixed row click event bug when clicking actions

## [8.2.11](https://www.npmjs.com/package/@hxui/angular/v/8.2.11) (2020-03-13)

### Enhancement

- **Typeaheads:** Renamed Typeaheads selector

## [8.2.10](https://www.npmjs.com/package/@hxui/angular/v/8.2.10) (2020-03-11)

### Enhancement

- **Tabular:** Added disabled to checkbox in tabular

## [8.2.9](https://www.npmjs.com/package/@hxui/angular/v/8.2.9) (2020-02-21)

### Enhancement

- **Tabular:** Added indeterminate to checkbox in tabular

## [8.2.8](https://www.npmjs.com/package/@hxui/angular/v/8.2.8) (2020-02-11)

### New component

- **Inspector:** Added inspector component and documentation

## [8.2.7](https://www.npmjs.com/package/@hxui/angular/v/8.2.7) (2020-02-04)

### Enhancement

- **Tabular:** Added isLoading property to actions

## [8.2.6](https://www.npmjs.com/package/@hxui/angular/v/8.2.6) (2020-02-04)

### Enhancement

- **Tabular:** Added fixed left and right column options

## [8.2.5](https://www.npmjs.com/package/@hxui/angular/v/8.2.5) (2020-01-22)

### Bugfix

- **Tooltips:** Bugfix for dynamic tooltips after Angular 8 upgrade

## [8.2.4](https://www.npmjs.com/package/@hxui/angular/v/8.2.4) (2020-01-14)

### Bugfix

- **Line Clamp:** Change .box name to something more specific as it could clash with 3rd party css selectors

## [8.2.3](https://www.npmjs.com/package/@hxui/angular/v/8.2.3) (2020-01-14)

### New Component

- **Line Clamp:** Added a new component that allows line clamping on text and html

## [8.2.1 - 8.2.2](https://www.npmjs.com/package/@hxui/angular/v/8.2.2) (2019-12-21)

### New Component

- **Ng-select:** Introduced and new 3rd party component called ng-select which replaces the depricated selectize

## [8.2.0](https://www.npmjs.com/package/@hxui/angular/v/8.2.0) (2019-10-31)

### Upgrade

- **Angular 8:** Upgraded Angular core and dependencies to Version 8

## [7.4.16](https://www.npmjs.com/package/@hxui/angular/v/7.4.15) (2019-11-18)

### New Component

- **Date Range picker:** Added a new date range picker with optional interval tab

## [7.4.15](https://www.npmjs.com/package/@hxui/angular/v/7.4.14) (2019-10-29)

### Enhancement

- **Selectize:** Added focus method to call focus on selectize internally

## [7.4.14](https://www.npmjs.com/package/@hxui/angular/v/7.4.14) (2019-10-23)

### Bug fix

- **Date Picker:** Fixed bug for date range validation when date formatted string is parsed

## [7.4.13](https://www.npmjs.com/package/@hxui/angular/v/7.4.13) (2019-10-22)

### Enhancement

- **Dropdown:** Add createClipPathMask option

## [7.4.11 - 7.4.12](https://www.npmjs.com/package/@hxui/angular/v/7.4.12) (2019-10-15)

### Bug fix

- **Filter Group:** Add disabled, hidden and isLoading states to filters

## [7.4.9 - 7.4.10](https://www.npmjs.com/package/@hxui/angular/v/7.4.10) (2019-10-02)

### Bug fix

- **Tabular:** Updated date format in tabular component to use the format 'dd/MM/yyyy'

## [7.4.6 - 7.4.8](https://www.npmjs.com/package/@hxui/angular/v/7.4.8) (2019-09-23)

### Bug fix

- **Tabular:** Fixed sorting bug in tabular where data contains tooltip info.

## [7.4.5](https://www.npmjs.com/package/@hxui/angular/v/7.4.5) (2019-09-23)

### Bug fix

- **Tabular:** Added tooltip support for column types. Also added example to documentation.

## [7.4.4](https://www.npmjs.com/package/@hxui/angular/v/7.4.4) (2019-09-17)

### Bug fix

- **Date Picker:** Set date to null when an invalid date is entered. Also added reactive form example to documentation.

## [7.4.3](https://www.npmjs.com/package/@hxui/angular/v/7.4.3) (2019-09-16)

### Update

- **Date Picker:** Add ClearIfNotMatched flag to ngx-mask so that invalid inputs are cleared on blur.

## [7.4.2](https://www.npmjs.com/package/@hxui/angular/v/7.4.2) (2019-09-11)

### Update

- **Date Picker:** Add hxaTextInput directive so date picker input is styled correctly (eg when date is not 'required')

## [7.4.1](https://www.npmjs.com/package/@hxui/angular/v/7.4.1) (2019-08-26)

### Enhancement

- **Filter:** Updated filters component to accept only numbers.

## [7.4.0](https://www.npmjs.com/package/@hxui/angular/v/7.4.0) (2019-08-26)

### Enhancement

- **Filter:** Added mask to filters to accept only numbers.

## [7.3.0](https://www.npmjs.com/package/@hxui/angular/v/7.3.0) (2019-08-14)

### Enhancement

- **Tabular:** Added property hidden for column.

## [7.2.0](https://www.npmjs.com/package/@hxui/angular/v/7.2.0) (2019-08-14)

### Update

- **Licence:** Updated licence type to MIT.

## [7.1.0](https://www.npmjs.com/package/@hxui/angular/v/7.1.0) (2019-08-05)

### New component

- **Dialog:** New component that will replaces the modal component. Modal Component is now deprecated.

## [7.0.59 - 7.0.60](https://www.npmjs.com/package/@hxui/angular/v/7.0.60) (2019-08-04)

### Enhancement

- **Typeahead:** Updated Typeahead to use HxUi dropdown. Also added optional placement and size properties

## [7.0.57](https://www.npmjs.com/package/@hxui/angular/v/7.0.56) (2019-07-16)

### Bug fix

- **Selectize:** setValue method will now look at valueField value ([d1f65b7b968553a41108f8a225956ee28db9e4cf](https://bitbucket.org/md-design/angular-hxui/commits/d1f65b7b968553a41108f8a225956ee28db9e4cf))

## [7.0.56](https://www.npmjs.com/package/@hxui/angular/v/7.0.56) (2019-07-15)

### Enhancement

- **Selectize:** Allow item param in render function to be ISelectizeItem|any ([d1f65b7b968553a41108f8a225956ee28db9e4cf](https://bitbucket.org/md-design/angular-hxui/commits/d1f65b7b968553a41108f8a225956ee28db9e4cf))

## [7.0.55](https://www.npmjs.com/package/@hxui/angular/v/7.0.55) (2019-07-15)

### Big fix

- **Filters:** Fixed issue for when a filter does not have a default option selected ([d1f65b7b968553a41108f8a225956ee28db9e4cf](https://bitbucket.org/md-design/angular-hxui/commits/d1f65b7b968553a41108f8a225956ee28db9e4cf))

## [7.0.54](https://www.npmjs.com/package/@hxui/angular/v/7.0.54) (2019-07-12)

### Enhancement

- **Selectize:** Added Selectize plugin that allows dropdown to be screen aware ([3477a5b77011e6847ae209a0345f00940b34ed0a](https://bitbucket.org/md-design/angular-hxui/commits/3477a5b77011e6847ae209a0345f00940b34ed0a))

## [7.0.53](https://www.npmjs.com/package/@hxui/angular/v/7.0.53) (2019-07-10)

### Enhancement

- **Date Picker:** Added onFocus output to the date picker input ([d1f65b7b968553a41108f8a225956ee28db9e4cf](https://bitbucket.org/md-design/angular-hxui/commits/d1f65b7b968553a41108f8a225956ee28db9e4cf))

## [7.0.52](https://www.npmjs.com/package/@hxui/angular/v/7.0.52) (2019-07-07)

### Bug fix

- **Selectize:** Updated z-index of selectize dropdown ([2ddde009ed8bfba25a208c09ae7e8b0a59c96184](https://bitbucket.org/md-design/angular-hxui/commits/2ddde009ed8bfba25a208c09ae7e8b0a59c96184))

## [7.0.51](https://www.npmjs.com/package/@hxui/angular/v/7.0.50) (2019-07-05)

### Bug fix

- **Date Picker:** Fix for masking change within intervals component ([183248b1744704f4f0762133fa84406eb8ee15be](https://bitbucket.org/md-design/angular-hxui/commits/183248b1744704f4f0762133fa84406eb8ee15be))

## [7.0.50](https://www.npmjs.com/package/@hxui/angular/v/7.0.50) (2019-07-05)

### Enhancement

- **Date Picker:** Added input masking to force users to enter a correctly formatted date ([183248b1744704f4f0762133fa84406eb8ee15be](https://bitbucket.org/md-design/angular-hxui/commits/183248b1744704f4f0762133fa84406eb8ee15be))

## [7.0.49](https://www.npmjs.com/package/@hxui/angular/v/7.0.49) (2019-07-01)

### Bug fix

- **Date Picker:** Fixed split of undefined bug ([27792a8566900ca90d40212eb9ea2034dc78de60](https://bitbucket.org/md-design/angular-hxui/commits/27792a8566900ca90d40212eb9ea2034dc78de60))

## [7.0.48](https://www.npmjs.com/package/@hxui/angular/v/7.0.48) (2019-06-29)

### Enhancement

- **Selectize:** Added onOptionAdded event for when a new option is added ([b3617a267543411de9ff91d88ddcd7c381490205](https://bitbucket.org/md-design/angular-hxui/commits/b3617a267543411de9ff91d88ddcd7c381490205))

## [7.0.47](https://www.npmjs.com/package/@hxui/angular/v/7.0.46) (2019-06-27)

### Bug fix

- **DatePicker:** Allow manual entry of date ([44e9db57532f4997bd3f9c3f9a72d3c5027b0322](https://bitbucket.org/md-design/angular-hxui/commits/9c60228716d97e6abe8bce63d5822784412af304))

## [7.0.46](https://www.npmjs.com/package/@hxui/angular/v/7.0.46) (2019-06-24)

### Bug fix

- **DatePicker:** Maintain state of date picker interval tabs on cancel ([9c60228716d97e6abe8bce63d5822784412af304](https://bitbucket.org/md-design/angular-hxui/commits/9c60228716d97e6abe8bce63d5822784412af304))

## [7.0.44](https://www.npmjs.com/package/@hxui/angular/v/7.0.44) (2019-06-19)

### Bug fix

- **DatePicker:** Added support for 0 value in interval picker. In addition date set to today if zero or negative numbers are used ([83021a3b1cc176fc9b982d65234895b93d40b645](https://bitbucket.org/md-design/angular-hxui/commits/83021a3b1cc176fc9b982d65234895b93d40b645))

## [7.0.43](https://www.npmjs.com/package/@hxui/angular/v/7.0.43) (2019-06-18)

### Bug fix

- **DatePicker:** Reset date when cancel is clicked in drop down ([ee0ae154ca09a6c844a77404a2e1fa246df6e153](https://bitbucket.org/md-design/angular-hxui/commits/ee0ae154ca09a6c844a77404a2e1fa246df6e153))

## [7.0.42](https://www.npmjs.com/package/@hxui/angular/v/7.0.42) (2019-06-06)

### Bug fix

- **Tabular:** Fixed issue which caused change detection to not run ([0f19207c34429d19a72255c6af1e3d73439c982a](https://bitbucket.org/md-design/angular-hxui/commits/0f19207c34429d19a72255c6af1e3d73439c982a))

## [7.0.41](https://www.npmjs.com/package/@hxui/angular/v/7.0.41) (2019-06-06)

### Bug fix

- **Datepicker:** Fixed issue with the onDateChange event which was triggering before ngModel was propegated and triggering multiple times on initialise ([5c3e9f1896b05819caf2eaf49eec234316ccb86d](https://bitbucket.org/md-design/angular-hxui/commits/5c3e9f1896b05819caf2eaf49eec234316ccb86d))

## [7.0.40](https://www.npmjs.com/package/@hxui/angular/v/7.0.40) (2019-06-04)

### Enhancements

- **Filters:** Added an optional width property to search type filters ([1e4bb5cfddbb3fae7ab436edf145f1fc303869a5](https://bitbucket.org/md-design/angular-hxui/commits/1e4bb5cfddbb3fae7ab436edf145f1fc303869a5))

## [7.0.39](https://www.npmjs.com/package/@hxui/angular/v/7.0.39) (2019-06-03)

### Bug Fix

- **Tabular:** Fixed issue with check all checkboxes running change detection multiple times ([e8c7bad37075b18a7996246bf3e5d8e97ccfa401](https://bitbucket.org/md-design/angular-hxui/commits/e8c7bad37075b18a7996246bf3e5d8e97ccfa401))

## [7.0.38](https://www.npmjs.com/package/@hxui/angular/v/7.0.38) (2019-05-24)

### Bug Fix

- **Tabular:** Fixed issue with check all checkboxes not un-checking when all rowData items have been unselected via the external source ([6a527d7ce4bc7e0cbc6e7234ad8b14e471028c56](https://bitbucket.org/md-design/angular-hxui/commits/6a527d7ce4bc7e0cbc6e7234ad8b14e471028c56))

## [7.0.37](https://www.npmjs.com/package/@hxui/angular/v/7.0.37) (2019-05-21)

### Enhancements

- **Selectize styling:** Selectize font and labels standardized to be consistent with css form styling. ([d701a5f3bd6a9a3f4eae51060f35a1a89227d4fd](https://bitbucket.org/md-design/angular-hxui/commits/d701a5f3bd6a9a3f4eae51060f35a1a89227d4fd))

## [7.0.36](https://www.npmjs.com/package/@hxui/angular/v/7.0.36) (2019-05-20)

### Enhancements

- **Tooltips:** Added support for projecting content into the tooltip content area via a tooltip dynamic content directive ([fa6b11626b68b3a0183bc2b2a759edb273b4168f](https://bitbucket.org/md-design/angular-hxui/commits/fa6b11626b68b3a0183bc2b2a759edb273b4168f))
- **Tooltips:** Added autoClose input, which allows tooltips to remain open until user clicks anywhere outside of tooltip ([fa6b11626b68b3a0183bc2b2a759edb273b4168f](https://bitbucket.org/md-design/angular-hxui/commits/fa6b11626b68b3a0183bc2b2a759edb273b4168f))

example:

```html
<i
  class="hx-icon icon-information-outline"
  hxTooltip
  [autoClose]="false"
  placement="right"
>
  <div *hxaTooltipDynamicContent>
    <div class="is-text-left pa-3">
      ENABLED FOR
      <ul>
        <li>Card payments</li>
        <li>Fully paid patient claims with EasyClaim</li>
        <li>
          Dynamic content with <a (click)="onClickHandler($event)">links</a>
        </li>
      </ul>
    </div>
  </div>
</i>
```

## [7.0.35](https://www.npmjs.com/package/@hxui/angular/v/7.0.35) (2019-05-14)

### Enhancements

- **Dropdowns:** Added the ability to set an x and/or y offset to set a dropdowns position. ([1b0137ddfbbf0bf413176be92fa1a7c95549480a](https://bitbucket.org/md-design/angular-hxui/commits/1b0137ddfbbf0bf413176be92fa1a7c95549480a))

example:

```html
 <div class="hx-dropdown" hxaDropdown [offsetX]="-20" [offsetY]="10">
          <button class="hx-button" hxDropdownToggle type="button">
            <span>Dropdown</span>
            <span class="hx-icon-control"><i class="icon icon-caret-down"></i></span>
          </button>
          <div class="hx-dropdown-menu" *hxaDropdownMenu>
              <div class="hx-dropdown-header">Dropdown header</div>
                <a class="hx-dropdown-item" hxaDropdownItem>Action</a>
                <a class="hx-dropdown-item" hxaDropdownItem>Another action</a>
                <div class="hx-dropdown-divider"></div>
                <a class="hx-dropdown-item" hxaDropdownItem>Action</a>
                <a class="hx-dropdown-item" hxaDropdownItem>Another action</a>
              </div>
            </div>
      </div>
```

## [7.0.34](https://www.npmjs.com/package/@hxui/angular/v/7.0.34) (2019-05-08)

### Features

- **Tabset:** Added background inheritance in tabset nav. ([a727168d75462d3883325007699380b4119fe7ee](https://bitbucket.org/md-design/angular-hxui/commits/a727168d75462d3883325007699380b4119fe7ee))
- **Tabset:** Added custom content class and sticky header features to tabset. ([a3ec14b6cf186f1a84cdeee47e7c7d0450f3a4e7](https://bitbucket.org/md-design/angular-hxui/commits/a3ec14b6cf186f1a84cdeee47e7c7d0450f3a4e7))
