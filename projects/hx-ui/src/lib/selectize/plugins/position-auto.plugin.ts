declare let Selectize: any;
Selectize.define('position_auto', function (options) {

  const originalKeyUp = this.onKeyUp;
  this.onKeyUp = function(e) {
    originalKeyUp.apply(this);
    this.positionDropdown();
  };

  this.positionDropdown = function () {
      const $control = this.$control,
        offset = this.settings.dropdownParent === 'body' ? $control.offset() : $control.position(),
        windowInnerHeight = window.innerHeight,
        dropdownHeight = this.$dropdown.outerHeight(true),
        controlHeight = $control.outerHeight(true),
        exceededWindowHeight = (offset.top + controlHeight + dropdownHeight) >= windowInnerHeight;

      this.$dropdown.css({
        top: exceededWindowHeight ? (offset.top - dropdownHeight) : (offset.top + controlHeight),
        left: offset.left,
        width: $control[0].getBoundingClientRect().width
      });
  }

});

