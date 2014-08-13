var assert = require("assert");

import reflector from "..";
import StubElement from "./util/stub-element.js";

describe("Reflecting boolean WebIDL attributes", () => {
    describe("getting", () => {
        var sut = reflector["boolean"].get;

        it("must return true if the content attribute is set", () => {
            var el = new StubElement({ attr1: "", attr2: "false", attr3: "blahblah" });

            assert.strictEqual(sut(el, "attr1"), true);
            assert.strictEqual(sut(el, "attr2"), true);
            assert.strictEqual(sut(el, "attr3"), true);
        });

        it("must return false if the content attribute is absent", () => {
            var el = new StubElement();

            assert.strictEqual(sut(el, "attr"), false);
        });
    });

    describe("setting", () => {
        var sut = reflector["boolean"].set;

        it("must remove the content attribute if set to false", () => {
            var el = new StubElement({ attr1: "", attr2: "false", attr3: "blahblah" });

            sut(el, "attr1", false);
            sut(el, "attr2", false);
            sut(el, "attr3", false);

            assert.strictEqual(el.hasAttribute("attr1"), false);
            assert.strictEqual(el.hasAttribute("attr1"), false);
            assert.strictEqual(el.hasAttribute("attr1"), false);
        });

        it("must not disturb content attributes that are not there when set to false", () => {
            var el = new StubElement();

            sut(el, "attr", false);

            assert.strictEqual(el.hasAttribute("attr"), false);
        });

        it("must set the content attribute to the empty string if set to true", () => {
            var el = new StubElement({ attr1: "", attr2: "false" });

            sut(el, "attr1", true);
            sut(el, "attr2", true);
            sut(el, "attr3", true);

            assert.strictEqual(el.hasAttribute("attr1"), true);
            assert.strictEqual(el.getAttribute("attr1"), "");
            assert.strictEqual(el.hasAttribute("attr2"), true);
            assert.strictEqual(el.getAttribute("attr2"), "");
            assert.strictEqual(el.hasAttribute("attr3"), true);
            assert.strictEqual(el.getAttribute("attr3"), "");
        });
    });
});
