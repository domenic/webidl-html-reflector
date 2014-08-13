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
