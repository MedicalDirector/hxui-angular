# Upgrade Guide

This document describes breaking changes and how to upgrade. For a complete list of changes including minor and patch releases, please refer to the [changelog](CHANGELOG.md).

## 13.0.0-next

_From Angular version 11_

### Date picker

Selector `hxa-datepicker-form` is _no longer available_.
Please update references to `hxa-datepicker-input`.

Output names have changed to align with [Angular Style Guide](https://angular.io/guide/styleguide):

- `onDateChange` → `dateChange`
- `onFocus` → `inputFocus`

Keyboard navigation has been enhanced to improve component accessibility. Markup and styling selectors have changed as a result. If you are overriding default styles, please review changes. Generally:

- `hxa-datepicker-form` → `hxa-datepicker`
- `hxa-datepicker-calendar` → `hxa-datepicker__overlay`
- `hxa-datepicker-` → `hxa-datepicker-calendar`
- `hx-datepicker-set-interval` → `hxa-datepicker-interval`

Default input mask pattern has been updated.

- `'d0/M0/0000'` → `'00/00/0000'`

The following properties have been removed from `DatePickerConfig`:

- `tabSelected`
- `selectedDueDateConfiguration`
