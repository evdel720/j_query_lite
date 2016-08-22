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
      input.htmlElements.forEach((el) => {
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
