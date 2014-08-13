var reflector = {};
export default reflector;

reflector["boolean"] = {
    get(element, name) {
        return element.hasAttribute(name);
    }
};
