export function numericObjectToArray(object) {
  return Object.keys(object)
    .sort((a, b) => a > b)
    .map(key => object[key]);
}

export function arrayToNumericObject(array) {
  return array.reduce((object, value, index) => ({ ...object, [index]: value }), {});
}

export function flattenArray(array) {
  return array.reduce((total, arr) => [...total, ...arr]);
}

export function unique(array) {
  return Array.from(new Set(array));
}

export function getDocsWithIds(querySnapshot) {
  const docs = [];

  querySnapshot.forEach(doc => {
    docs.push(Object.assign(doc.data(), {
      id: doc.id
    }))
  });

  return docs;
}
