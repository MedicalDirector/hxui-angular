import { Component, Inject, OnInit } from "@angular/core";
import { CoreBaseComponent } from "../core-base.component";
import { BreakpointObserver } from "@angular/cdk/layout";
import { DOCUMENT } from "@angular/common";
import { InspectorCode } from "./inspector.code";
import { InspectorService } from "../../../../projects/hx-ui/src/lib/inspector/inspector.service";
import { BasicCustomInspectorComponent } from "./custom-inspectors/basic-custom-inspector.component";
import { PageScrollService } from "ngx-page-scroll-core";
import { InspectorLocation } from "../../../../projects/hx-ui/src/lib/inspector/inspector-location.enum";

@Component({
  selector: "hxa-inspector",
  templateUrl: "./inspector.component.html",
  styleUrls: ["./inspector.component.scss"]
})
export class InspectorComponent extends CoreBaseComponent implements OnInit {
  code = new InspectorCode();
  constructor(
    protected pageScrollService: PageScrollService,
    protected breakpointObserver: BreakpointObserver,
    @Inject(DOCUMENT) protected document: any,
    private inspectorService: InspectorService
  ) {
    super(pageScrollService, breakpointObserver, document);
  }

  ngOnInit() {}

  openInspector = () => {
    this.inspectorService.open(
      BasicCustomInspectorComponent,
      {
        hasClose: false,
        closeOnBackdropClick: true,
        location: InspectorLocation.Right
      },
      {
        visitId: 10,
        onClose: data => {
          console.log(data);
        },
        onResize: data => {
          console.log(data);
        }
      }
    );
  };
}
