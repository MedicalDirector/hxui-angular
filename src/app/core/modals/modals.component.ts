import {Component, Inject, OnInit} from '@angular/core';
import {ModalService} from '../../../../projects/hx-ui/src/lib/modal/modal.service';
import {CustomModalComponent} from './custom-modal/custom-modal.component';
import {PageScrollService} from 'ngx-page-scroll';
import {DOCUMENT} from '@angular/common';
import {CoreBaseComponent} from '../core-base.component';
import {ModalsCode} from './modals.code';

@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styles: [':host { display:flex; flex: 1; min-width: 0; }']
})
export class ModalsComponent extends CoreBaseComponent implements OnInit {

  code = new ModalsCode();
  constructor(protected pageScrollService: PageScrollService,
              @Inject(DOCUMENT) protected document: any,
              private modalService: ModalService) {
    super(pageScrollService, document);
  }

  ngOnInit() {
  }

  openModal = () => {
    this.modalService.create<CustomModalComponent>(CustomModalComponent, {
      onSuccess: (data) => {
        alert(data);
      },
      onCancelled: (data) => {
        alert(data);
      }
    });
  }

}
