/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const $l = __webpack_require__(1);

	$l(() => {
	  console.log("Properly loaded.");
	})


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const DOMNodeCollection = __webpack_require__(2);

	function $l (selector) {
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


	module.exports = $l;


/***/ },
/* 2 */
/***/ function(module, exports) {

	class DOMNodeCollection {
	  constructor(htmlElements) {
	    this.htmlElements = htmlElements;
	  }

	  html(str) {
	    if (str === undefined) {
	      return [this.htmlElements[0].innerHTML];
	    } else {
	      this.htmlElements.forEach((el) => {
	        el.innerHTML = str;
	      });
	      return this.htmlElements;
	    }
	  }

	  empty() {
	    this.htmlElements.forEach((el) => {
	      el.innerHTML = "";
	    });
	    return this.htmlElements;
	  }

	  append(input) {
	    if (typeof input === "string") {
	      this.htmlElements.forEach((htmlEl) => {
	        htmlEl.innerHTML += input;
	      });
	    } else {
	      input.forEach((el) => {
	        this.htmlElements.forEach((htmlEl) => {
	          htmlEl.innerHTML += el.outerHTML;
	        });
	      });
	    }
	    return this.htmlElements;
	  }

	  attr(key, value) {
	    if (value === undefined) {
	      return this.htmlElements[0].getAttribute(key);
	    } else {
	      this.htmlElements.forEach((el) => {
	        el.setAttribute(key, value);
	      });
	    }
	  }

	  addClass(str) {
	    this.htmlElements.forEach((el) => {
	      el.className += " " + str;
	    });
	  }

	  removeClass(str) {
	    this.htmlElements.forEach((el) => {
	      let classNames = el.className.split(" ");
	      if (classNames.includes(str)) {
	        classNames.splice(classNames.indexOf(str), 1);
	      }

	      el.className = classNames.join(" ");
	    });
	  }

	  children() {
	    let kids = [];
	    this.htmlElements.forEach((el) => {
	      kids = kids.concat(el.children);
	    });

	    return kids;
	  }

	  parent() {
	    let parents = [];
	    this.htmlElements.forEach((el) => {
	      parents = parents.concat(el.parentNode);
	    });

	    return parents;
	  }

	  find(selector) {
	    let result = [];
	    this.htmlElements.forEach((el) => {
	      result = result.concat(el.querySelectorAll(selector));
	    });

	    return result;
	  }

	  remove() {
	    this.htmlElements.forEach((el) => {
	      el.outerHTML = "";
	    });
	  }

	  on(trigger, callback) {
	    this.htmlElements.forEach((el) => {
	      el.addEventListener(trigger, callback);
	    });
	  }

	  off(trigger, callback) {
	    this.htmlElements.forEach((el) => {
	      el.removeEventListener(trigger, callback);
	    });
	  }

	}

	module.exports = DOMNodeCollection;


/***/ }
/******/ ]);