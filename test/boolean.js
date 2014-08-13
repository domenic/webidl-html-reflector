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

        it("must return true if the content attribute is set even when called with a different case", () => {
            var el = new StubElement({ attr1: "", attr2: "false", attr3: "blahblah" });

            assert.strictEqual(sut(el, "Attr1"), true);
            assert.strictEqual(sut(el, "aTTr2"), true);
            assert.strictEqual(sut(el, "ATTR3"), true);
        });

        it("must return false if the content attribute is absent", () => {
            var el = new StubElement();

            assert.strictEqual(sut(el, "attr"), false);
        });
    });
});
