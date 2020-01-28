export function cloneAttributes<T extends NamedNodeMap>(el: { attributes: NamedNodeMap }) {
  return Object.values(el.attributes as T).reduce((acc: any, attr: Attr): T => {
    acc[attr.name] = attr.value;
    return acc;
  }, {});
}
