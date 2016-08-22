const DOMNodeCollection = require('./dom_node_collection.js');

function $l (selector) {
  if (typeof selector === "function") {
    document.addEventListener("DOMContentLoaded", selector);
    return;
  }

  let object = [selector];

  if (typeof selector === "string") {
    if (selector.indexOf("<") === -1 ) {
      selector = document.querySelectorAll(selector);
      object = Array.from(selector);
    } else {
      let tag = selector.match(/<(.+)><\//)[1];
      object = [document.createElement(tag)];
    }
  }

  return new DOMNodeCollection(object);
}

$l.prototype.extend = function (first, ...objects) {
  objects.forEach((ob) => {
    Object.keys(ob).forEach((key) => {
      first.key = ob.key;
    });
  });

  return first;
};

$l.prototype.ajax = function (options) {
  const xhr = new XMLHttpRequest();
  let defaults = {type: "GET",
                  dataType: "json",
                  error: () => console.log("error!"),
                  data: {}
  };
  options = this.extend(defaults, options);
  xhr.open(options.type, options.url);

  xhr.onload = function () {
    if (xhr.status === 200) {
      options.success(xhr.response);
    } else {
      options.error();
    }
  };

  xhr.send(options.data);
};


module.exports = $l;
