const DOMNodeCollection = require('./dom_node_collection.js');

function $l (selector) {
  // if (selector instanceof String) {
  //   let domObjects = document.querySelectorAll(selector);
  //   let domObjArr = Array.from(domObjects);
  //   return new DOMNodeCollection(domObjArr);
  // } else if (selector instanceof Object) {
  //   return new DOMNodeCollection([selector]);
  // }

  if (typeof selector === "function") {
    document.addEventListener("DOMContentLoaded", selector);
    return;
  }

  let object = [selector];
  if (typeof selector === "string") {
    selector = document.querySelectorAll(selector);
    object = Array.from(selector);
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

$l( () => {
  let test1 = $l(".test1");
  test1.attr("style", "background-color: red");
  test1.addClass("more-class");
  test1.removeClass("test1");
  test1.html("text here!");
  let test3 = $l(".test3");
  test3.empty();
  let test2 = $l(".test2");
  test2.append("<p>table text</p>");
});
