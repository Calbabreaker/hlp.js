// acts like kindof a normal dom element except it contains and modifies many elements
export class DOMList {
  constructor(nodeList) {
    // make _nodeList "hidden"
    Object.defineProperty(this, "_nodeList", {
      enumerable: false,
      writable: true,
      value: (this._nodeList = [...nodeList]),
    });

    // this is so users can get elements using the index operator
    Object.assign(this, nodeList);

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
        if (Reflect.has(target, name)) {
          return Reflect.get(target, name, receiver);
        }

        // else get property in a string of every node
        let output = "";
        // when user calls function it needs to return a funcion so this does here
        let isFunc = false;
        nodeList.forEach((node) => {
          if (typeof node[name] == "function") {
            const funcOut = node[name]();
            if (funcOut != null) output += funcOut;
            isFunc = true;
          } else if (node[name] != null) {
            output += node[name];
          }
        });

        return isFunc ? () => output : output;
      },
      set(target, name, value, receiver) {
        // same thing but set instead
        if (Reflect.has(target, name)) {
          return Reflect.set(target, name, value, receiver);
        }

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
