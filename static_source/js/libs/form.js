(function (global) {
'use strict';

  var logger = console.log.bind(console);

  function findFormData(formData, name) {
    return formData.find(function (data) {
      return data.name === name;
    });
  }

  function handleError(XMLHttpRequest, textStatus, errorThrown) {
    logger(XMLHttpRequest.responseText);
  }

  function setLogger(l) {
    logger = l;
  }
  
  global.form = {
    findData: findFormData,
    error: handleError,
    setLogger: setLogger
  };

})(this);
