(function (global) {
'use strict';

  function notEmpty(str) {
    return !!str && str.length > 0;
  }

  global.validate = {
    notEmpty: notEmpty
  };

})(this);
