export enum DisplayMode {
  showTab = 1,
  showCustomOnly,
  showIntervalOnly
}

export interface DateRange {
  fromDate: Date;
  toDate: Date;
}

//expanded when more tabs be added
export enum DateSelectionType {
  interval,
  custom
}
