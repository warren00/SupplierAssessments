// Generated by CoffeeScript 1.6.3
(function() {
  var __hasProp = {}.hasOwnProperty;

  ko.bindingHandlers.morris = {
    init: function(element, valueAccessor) {
      var key, options, value, _ref;
      options = {
        element: element
      };
      _ref = ko.unwrap(valueAccessor());
      for (key in _ref) {
        if (!__hasProp.call(_ref, key)) continue;
        value = _ref[key];
        options[key] = ko.unwrap(value);
      }

      element.morris = new Morris[options.type](options);

      $(document).ready(function () {
          $(window).resize(function () {
              element.morris.redraw();
          })
      });

      return element.morris;
    },
    update: function(element, valueAccessor) {
      var _base;
      return typeof (_base = element.morris).setData === "function" ? _base.setData(ko.unwrap((ko.unwrap(valueAccessor())).data)) : void 0;
    }
  };

}).call(this);
