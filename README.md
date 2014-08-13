# Reflecting HTML Attributes as WebIDL Attributes

This package implements, in JavaScript, the algorithms to [reflect](http://www.whatwg.org/specs/web-apps/current-work/multipage/infrastructure.html#reflect) a [HTML](http://www.whatwg.org/specs/web-apps/current-work/multipage/) "content attribute" as a [WebIDL](http://heycam.github.io/webidl/) "attribute."

In practice, this is about how when you do `document.querySelector("ol").reversed = true`, this automatically causes the corresponding `<ol>` element in the DOM tree to gain an attribute `reversed=""`. Similarly, when you set `reversed` to `false` from JavaScript, the `reversed` attribute in the DOM tree disappears. This corresondence is called the _reflection_ between the HTML element's "content attributes" (i.e. DOM attributes), and the properties of that element's JavaScript instance, which are specified via WebIDL "attributes."

The rules for this reflection are long and varied, with different rules applying to different WebIDL types (which are distinct, of course, from JavaScript types) and even to different sub-cases within those types. However, they are rules, and we can automate them in JavaScript.

## API

This package's main module's default export is an object with a variety of properties, each corresponding to a different WebIDL type. Each type then has `get` and `set` functions which implement the corresponding reflection rules, given an element and a content attribute name. So, it goes something like this:

```js
import reflector from "webidl-reflector";

// Should give you the same result as `olElement.reversed`
reflector["boolean"].get(olElement, "reversed");

// Should give you the same result as `anchorElement.target = "_blank"`
reflector["DOMString"].set(anchorElement, "target", "_blank");

// Should give you the same result as `metaElement.httpEquiv = "refresh"`
reflector["DOMString"].set(metaElement, "http-equiv", "refresh");
```

It is very important that **you must only pass in values of the expected type**. That is, if you are working with a `boolean` WebIDL attribute, you should only pass in `true` or `false`; if you are working with a `long` WebIDL attribute, you should only pass in JavaScript numbers that are integers within the range [−2147483648, 2147483647]; etc. If you want to be able to handle any JavaScript value, you should first convert it following the appropriate WebIDL conversion rules. (TODO: link to a package for that once I write it.)

If you fail to type-check your values beforehand, this package's behavior is undefined; in particular, we won't validate the types ahead of time for you.

## Status

So far only `boolean` and `DOMString` types are implemented. None of the variants of `DOMString` (viz. enumerated attributes, URLs, one-or-more URLs) are implemented. This list will grow over time in service of the [HTML as Custom Elements](https://github.com/dglazkov/html-as-custom-elements) project, but in the meantime, pull requests welcome!

## But Why!?

What's the point of this project? Well, here's the deal: we want to [reimplement HTML as custom elements](https://github.com/dglazkov/html-as-custom-elements).

A lot of the behavior of HTML elements, and in particular the JavaScript classes that back them in the DOM tree, is tied up inside the elements' WebIDL definitions. Some of the properties of the JavaScript class do something useful or at least complicated, e.g. `HTMLImageElement.prototype.naturalHeight`. But many of them do basically nothing, besides set or get the element's DOM attributes: `HTMLLIElement.prototype.value`, `HTMLModElement.prototype.cite`, and so on and so forth.

In trying to reimplement HTML as custom elements, we naturally have to create JavaScript classes for each HTML element. In order to stay spec-compliant, we'd like to extract and automate the tedious logic involved in creating properties that reflect the element's DOM attributes. And thus, this project was born!
