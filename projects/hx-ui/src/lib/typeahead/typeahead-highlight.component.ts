import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';

/**
 * A component that helps with text highlighting.
 *
 * If splits the `result` text into parts that contain the searched `term` and generates the HTML markup to simplify
 * highlighting:
 *
 * Ex. `result="Alaska"` and `term="as"` will produce `Al<span class="ngb-highlight">as</span>ka`.
 */
@Component({
  selector: 'hxa-highlight',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-template ngFor [ngForOf]="parts" let-part let-isOdd="odd">
      <span *ngIf="isOdd; else even" [class]="highlightClass">{{ part }}</span
      ><ng-template #even>{{ part }}</ng-template>
    </ng-template>
  `, // template needs to be formatted in a certain way so we don't add empty text nodes
  styles: [
    '.highlight { background: rgba(35, 49, 43, 0.23); border-radius: 1px; font-weight: bold; }'
  ]
})
export class TypeaheadHighlightComponent implements OnChanges {
  parts: string[];

  /**
   * The CSS class for `<span>` elements wrapping the `term` inside the `result`.
   */
  @Input() highlightClass = 'highlight';

  /**
   * The text highlighting is added to.
   *
   * If the `term` is found inside this text, it will be highlighted.
   * If the `term` contains array then all the items from it will be highlighted inside the text.
   */
  @Input() result?: string | null;

  /**
   * The term or array of terms to be highlighted.
   * Since version `v4.2.0` term could be a `string[]`
   */
  @Input() term: string | string[];

  toString(value: unknown): string {
    return value !== undefined && value !== null ? `${value}` : '';
  }

  regExpEscape(text: string): string {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  }

  ngOnChanges(changes: SimpleChanges): void {
    const result = this.toString(this.result);

    const terms: string[] = Array.isArray(this.term) ? this.term : [this.term];
    const escapedTerms = terms
      .map(term => this.regExpEscape(this.toString(term)))
      .filter(term => term);

    this.parts = escapedTerms.length
      ? result.split(new RegExp(`(${escapedTerms.join('|')})`, 'gmi'))
      : [result];
  }
}
