import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `<section class="hx-section"><div class="hx-flex-1">
          <h1 class="hx-title">Page Not Found</h1>
          <div>Opps, another 404 page</div>
          <hr class="headingDivider">
            </div></section>`
})
export class PageNotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
