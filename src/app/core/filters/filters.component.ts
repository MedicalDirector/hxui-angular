import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { CoreBaseComponent } from "../core-base.component";
import { DOCUMENT } from "@angular/common";
import { PageScrollService } from "ngx-page-scroll-core";
import { FiltersCode } from "./filters.code";
import { BreakpointObserver } from "@angular/cdk/layout";

@Component({
  selector: "app-filters",
  templateUrl: "./filters.component.html",
  styles: [":host { display: flex; flex: 1; min-width: 0; }"]
})
export class FiltersComponent extends CoreBaseComponent
  implements OnInit, OnDestroy {
  /**
   * toggle for version 8 documentation
   *
   * **NOTE:** this is an interim solution dated 07/03/2022
   */
  isVersion8 = false;

  code = new FiltersCode();

  constructor(
    protected pageScrollService: PageScrollService,
    protected breakpointObserver: BreakpointObserver,
    @Inject(DOCUMENT) protected document: any
  ) {
    super(pageScrollService, breakpointObserver, document);
  }

  ngOnInit() {}

  ngOnDestroy() {}

  toggleVersions() {
    this.isVersion8 = !this.isVersion8;
  }
}
