// acts like kindof a normal dom element except it contains and modifies many elements
export class DOMList {
  constructor(nodeList) {
    // make _nodeList "hidden"
    Object.defineProperty(this, "_nodeList", {
      enumerable: false,
      writable: false,
      value: [...nodeList],
    });

    // this is so users can get elements using the index operator
    Object.assign(this, nodeList);

    if (window.Proxy == null) return console.error("Browser does not support Proxy! (required for hlp.DOMList)");

    // proxy for styling
    // need to put in func somehow
    // prettier-ignore
    this.style = new Proxy({}, {
      get(target, name) {
        let output = "";
        nodeList.forEach((node) => {
          if (node.style[name] != null) {
            output += node.style[name];
          }
        });

        return output;
      },
      set(target, name, value) {
        nodeList.forEach((node) => {
          if (node.style[name] != null) {
            node.style[name] = value;
          }
        });
      },
    });

    // uses proxy to intercept get and set
    return new Proxy(this, {
      get(target, name, receiver) {
        // if DOMList has a property of name then just use that
        if (Reflect.has(target, name)) return Reflect.get(target, name, receiver);

        // else get property in a string of every node
        const output = [];
        // when user calls function it needs to return a funcion so this does here
        const nodeFuncs = [];
        nodeList.forEach((node) => {
          if (typeof node[name] == "function") {
            // had to be this to avoid illegal invocation
            nodeFuncs.push(node);
          } else if (node[name] != null && nodeFuncs.length < 1) {
            let out = node[name];
            if (out) output.push(out);
          }
        });

        if (nodeFuncs.length > 0) {
          return (...args) => {
            const outputFunc = [];
            nodeFuncs.forEach((node) => {
              let out = node[name](...args);
              if (out) outputFunc.push(out);
            });

            return outputFunc;
          };
        } else {
          return output;
        }
      },
      set(target, name, value, receiver) {
        // same thing but set instead
        if (Reflect.has(target, name)) return Reflect.set(target, name, value, receiver);

        // set every node
        nodeList.forEach((node) => {
          if (node[name] != null) {
            node[name] = value;
          }
        });
      },
    });
  }

  toArray() {
    return this._nodeList;
  }
}
// helper function for easier use
export const selectDOM = (selector) => {
  const nodeList = document.querySelectorAll(selector);
  return new DOMList(nodeList);
};

export const createDOM = (name) => {
  const element = document.createElement(name);
  return new DOMList([element]);
};
