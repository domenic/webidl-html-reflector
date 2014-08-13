var reflector = {};
export default reflector;

reflector["boolean"] = {
    get(element, name) {
        return element.hasAttribute(name);
    },
    set(element, name, value) {
        if (value) {
            element.setAttribute(name, "");
        } else {
            element.removeAttribute(name);
        }
    }
};

reflector["DOMString"] = {
    get(element, name) {
        var value = element.getAttribute(name);
        return value === null ? "" : value;
    },

    set(element, name, value) {
        element.setAttribute(name, value);
    }
};
