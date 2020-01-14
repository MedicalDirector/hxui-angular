import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'hxa-line-clamp',
  template: `
  <div #box class="hxa-line-clamp-box">
    <ng-content></ng-content>
  </div>
  <a class="toggle {{toggleCss}}" *ngIf="enabled" (click)=" toggle() ">
  {{opened ? 'Show Less' : 'Show More'}}
  </a>`,
  styleUrls: ['./line-clamp.component.scss'],
})
export class LineClampComponent implements AfterContentInit {
  @ContentChild('content', { static: false }) content: ElementRef;

  @ViewChild('box', { static: false }) box: ElementRef;

  @Input() row = 1;
  @Input() toggleCss: string = "hx-button is-link is-small";

  enabled = false;
  opened = false;
  private boxHeight: number;

  constructor(private cd: ChangeDetectorRef) {}

  ngAfterContentInit() {
    setTimeout(() => {
      // calc the content height and the box height
      const contentElm = this.content.nativeElement;
      const contentHeight = parseInt(
        window
          .getComputedStyle(contentElm, undefined)
          .getPropertyValue('height'),
        10
      );
      this.boxHeight = getLineHeight(contentElm) * this.row;
      if (contentHeight > this.boxHeight) {
        this.enable();
        this.cd.detectChanges();
      }
      this.box.nativeElement.style.visibility = 'visible';
    }, 0);
  }

  toggle() {
    this.opened ? this.close() : this.open();
  }

  /**
   * show more/less 機能を有効にする
   */
  private enable() {
    this.enabled = true;
    this.close();
  }

  private open() {
    this.opened = true;

    // enable clamp
    this.box.nativeElement.style['-webkit-line-clamp'] = 'initial';
    this.box.nativeElement.style.height = 'auto';
  }

  private close() {
    this.opened = false;

    // disable clamp
    this.box.nativeElement.style['-webkit-line-clamp'] = this.row;
    this.box.nativeElement.style.height = this.boxHeight + 'px';
  }
}

function getLineHeight(element: HTMLElement): number {
  let lineHeight = parseInt(
    window.getComputedStyle(element, undefined).getPropertyValue('lineHeight'),
    10
  );
  if (isNaN(lineHeight)) {
    const clone = element.cloneNode() as HTMLElement;
    clone.innerHTML = '<br>';
    element.appendChild(clone);
    lineHeight = clone.clientHeight;
    element.removeChild(clone);
  }
  return lineHeight;
}
