export default class StubElement {
    constructor(attributesMap = {}) {
        this._attributes = Object.create(null);

        Object.keys(attributesMap).forEach(attributeName => {
            this.setAttribute(attributeName, attributesMap[attributeName]);
        });
    }

    setAttribute(name, value) {
        [name, value] = [normalizeAttrName(name), String(value)];
        this._attributes[name] = value;
    }

    getAttribute(name) {
        name = normalizeAttrName(name);
        return name in this._attributes ? this._attributes[name] : null;
    }

    hasAttribute(name) {
        name = normalizeAttrName(name);
        return name in this._attributes;
    }

    removeAttribute(name) {
        name = normalizeAttrName(name);
        delete this._attributes[name];
    }
}

function normalizeAttrName(name) {
    return String(name).toLowerCase();
}
