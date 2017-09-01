import { TemplateRef, ViewContainerRef } from '@angular/core';

export class HxComponentRef<T> {
  templateRef: TemplateRef<T>;
  viewContainer: ViewContainerRef;
}
