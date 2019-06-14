import { DOCUMENT } from '@angular/common';
import {
  ApplicationRef,
  ComponentFactoryResolver,
  Inject,
  Injectable,
} from '@angular/core';

import { DomPortalHost } from '../portal/dom-portal-host';
import { ToastrContainerDirective } from '../toastr.directive';
import { OverlayContainer } from './overlay-container';
import { OverlayRef } from './overlay-ref';
import {ToastrPosition} from '../toastr-config';

/**
 * Service to create Overlays. Overlays are dynamically added pieces of floating UI, meant to be
 * used as a low-level building building block for other components. Dialogs, tooltips, menus,
 * selects, etc. can all be built using overlays. The service should primarily be used by authors
 * of re-usable components rather than developers building end-user applications.
 *
 * An overlay *is* a PortalHost, so any kind of Portal can be loaded into one.
 */
@Injectable({ providedIn: 'root' })
export class Overlay {
  // Namespace panes by overlay container
  private _paneElements: Map<
    ToastrContainerDirective,
    { string?: HTMLElement }
  > = new Map();

  constructor(
    private _overlayContainer: OverlayContainer,
    private _componentFactoryResolver: ComponentFactoryResolver,
    private _appRef: ApplicationRef,
    @Inject(DOCUMENT) private _document: any,
  ) {}
  /**
   * Creates an overlay.
   * @returns A reference to the created overlay.
   */
  create(
    position?: ToastrPosition,
    overlayContainer?: ToastrContainerDirective,
  ): OverlayRef {
    // get existing pane if possible
    return this._createOverlayRef(
      this.getPaneElement(position, overlayContainer),
    );
  }

  getPaneElement(
    position: ToastrPosition = ToastrPosition.TOP_RIGHT,
    overlayContainer?: ToastrContainerDirective,
  ): HTMLElement {
    if (!this._paneElements.get(overlayContainer)) {
      this._paneElements.set(overlayContainer, {});
    }

    if (!this._paneElements.get(overlayContainer)[position]) {
      this._paneElements.get(overlayContainer)[position] = this._createPaneElement(position, overlayContainer);
    }

    return this._paneElements.get(overlayContainer)[position];
  }


  /**
   * Creates the DOM element for an overlay and appends it to the overlay container.
   * @returns Newly-created pane element
   */
  private _createPaneElement(
    position: ToastrPosition,
    overlayContainer?: ToastrContainerDirective,
  ): HTMLElement {
    const pane = this._document.createElement('div');

    pane.id = 'hxa-toastr-container';
    /// pane.classList.add(positionClass);
    pane.classList.add('hxa-toastr-container');
    pane.classList.add('hxui-reset');
    pane.style.position = 'fixed';
    pane.style['z-index'] = 1000;

    if (position === ToastrPosition.CENTER_CENTER) {
      pane.style.top = '50%';
      pane.style.left = '50%';
      pane.style.transform = 'translate(-50%, -50%)';
    } else if (position === ToastrPosition.TOP_CENTER) {
      pane.style.top = '0';
      pane.style.right = '0';
      pane.style.width = '100%';
    } else if (position === ToastrPosition.BOTTOM_CENTER) {
      pane.style.bottom = '0';
      pane.style.right = '0';
      pane.style.width = '100%';
    } else if (position === ToastrPosition.TOP_FULL_WIDTH) {
      pane.style.top = '0';
      pane.style.right = '0';
      pane.style.width = '100%';
    } else if (position === ToastrPosition.BOTTOM_FULL_WIDTH) {
      pane.style.bottom = '0';
      pane.style.right = '0';
      pane.style.width = '100%';
    } else if (position === ToastrPosition.TOP_LEFT) {
      pane.style.top = '2rem';
      pane.style.left = '2rem';
    } else if (position === ToastrPosition.TOP_RIGHT) {
      pane.style.top = '2rem';
      pane.style.right = '2rem';
    } else if (position === ToastrPosition.BOTTOM_RIGHT) {
      pane.style.bottom = '2rem';
      pane.style.right = '2rem';
    } else if (position === ToastrPosition.BOTTOM_LEFT) {
      pane.style.bottom = '2rem';
      pane.style.left = '2rem';
    }

    if (!overlayContainer) {
      this._overlayContainer.getContainerElement().appendChild(pane);
    } else {
      overlayContainer.getContainerElement().appendChild(pane);
    }

    return pane;
  }

  /**
   * Create a DomPortalHost into which the overlay content can be loaded.
   * @param pane The DOM element to turn into a portal host.
   * @returns A portal host for the given DOM element.
   */
  private _createPortalHost(pane: HTMLElement): DomPortalHost {
    return new DomPortalHost(
      pane,
      this._componentFactoryResolver,
      this._appRef,
    );
  }

  /**
   * Creates an OverlayRef for an overlay in the given DOM element.
   * @param pane DOM element for the overlay
   */
  private _createOverlayRef(pane: HTMLElement): OverlayRef {
    return new OverlayRef(this._createPortalHost(pane));
  }
}
