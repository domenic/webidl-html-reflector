var assert = require("assert");

import reflector from "..";
import StubElement from "./util/stub-element.js";

describe("Reflecting DOMString WebIDL attributes", () => {
    describe("getting", () => {
        var sut = reflector["DOMString"].get;

        it("must transparently pass through the content attribute's value if present, in a case-preserving way", () => {
            var el = new StubElement({ attr1: "", attr2: "hello", attr3: "Hi There" });

            assert.strictEqual(sut(el, "attr1"), "");
            assert.strictEqual(sut(el, "attr2"), "hello");
            assert.strictEqual(sut(el, "attr3"), "Hi There");
        });

        it("must return the empty string if the content attribute is not present", () => {
            var el = new StubElement();

            assert.strictEqual(sut(el, "attr"), "");
        });
    });

    describe("setting", () => {
        var sut = reflector["DOMString"].set;

        it("must transparently pass through the value to the content attribute, in a case-preserving way", () => {
            var el = new StubElement({ attr1: "", attr2: "hello" });

            sut(el, "attr1", "HI");
            sut(el, "attr2", "Hello");
            sut(el, "attr3", "what's up");
            sut(el, "attr4", "");

            assert.strictEqual(el.getAttribute("attr1"), "HI");
            assert.strictEqual(el.getAttribute("attr2"), "Hello");
            assert.strictEqual(el.getAttribute("attr3"), "what's up");
            assert.strictEqual(el.hasAttribute("attr4"), true);
            assert.strictEqual(el.getAttribute("attr4"), "");
        });
    });
});
