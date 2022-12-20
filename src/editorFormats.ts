import Quill from "quill";

const Link = Quill.import("formats/link");
const Header = Quill.import("formats/header");

export interface LinkFormat {
  href: string;
  target: string;
}

function isStringified(value: string): boolean {
  try {
    JSON.parse(value);
  } catch (e) {
    return false;
  }
  return true;
}

export class CTAFormat extends Link {
  static blotName = "cta";

  static create(value: any) {
    const node: HTMLAnchorElement = Link.create();
    let newValue: string | LinkFormat;
    /**
     * Check if given value is a JSON string.
     *
     * @see JSON.stringify
     */
    if (isStringified(value)) {
      newValue = JSON.parse(value);
    } else {
      newValue = value;
    }
    /**
     * Check if given value's type is not an string.
     * (either the value was converted from JSON string into an object or it was an object)
     */
    node.setAttribute("data-class", "cta");
    if (typeof newValue !== "string") {
      /**
       * Set 'href' and 'target' as attributes based on stored values.
       */
      node.setAttribute("href", newValue.href);
      node.setAttribute("target", newValue.target);
      return node;
    }
    /**
     * In case if given value's type was string.
     */
    node.setAttribute("href", newValue);
    return node;
    // console.log("=== value before sanitize", value);
    // value = Link.sanitize(value);
    // node.setAttribute("href", value);
    // return node;
  }

  /**
   * @param domNode DOM Node which is {@link HTMLAnchorElement}
   *
   * @returns JSON string which contains DOM Node 'href' and 'target' attribute values.
   */
  static formats(domNode: HTMLAnchorElement): Object {
    return {
      href: domNode.getAttribute("href"),
      target: domNode.getAttribute("target"),
      ["data-class"]: "cta",
    };
  }

  format(name: string, value: any) {
    if (name !== this.statics.blotName || !value) {
      return super.format(name, value);
    }

    let newValue: string | LinkFormat;
    /**
     * Check if given value is a JSON string.
     *
     * @see JSON.stringify
     */
    if (isStringified(value)) {
      newValue = JSON.parse(value);
    } else {
      newValue = value;
    }
    /**
     * Check if given value's type is not an string.
     * (either the value was converted from JSON string into an object or it was an object)
     */
    this.domNode.setAttribute("data-class", "cta");
    if (typeof newValue !== "string") {
      /**
       * Set 'href' and 'target' as attributes based on stored values.
       */
      this.domNode.setAttribute("href", newValue.href);
      this.domNode.setAttribute("target", newValue.target);
    } else {
      this.domNode.setAttribute("href", newValue);
    }
  }
}

export class HeaderFormat extends Header {
  static blotName = "header";
  static create(value: any) {
    if (/^custom-/i.test(value)) {
      const customType = value.replace(/^custom-/i, "");
      switch (customType) {
        case "caption":
          const node: HTMLSpanElement = document.createElement("span");
          node.setAttribute("data-text-type", "caption");
          return node;
        case "normal":
        default:
          break;
      }
    } else {
      return document.createElement(value);
    }
  }

  static formats(domNode: HTMLElement): Object {
    const tagName = domNode.tagName.toLocaleLowerCase();
    const dataTextType = domNode.getAttribute("data-text-type");
    return dataTextType ? `custom-${dataTextType}` : tagName;
  }
}
