(() => {
  function numericObjectToArray(object) {
    return Object.keys(object)
      .sort((a, b) => a > b)
      .map(key => object[key]);
  }

  function arrayToNumericObject(array) {
    return array.reduce((object, value, index) => ({ ...object, [index]: value }), {});
  }

  function flattenArray(array) {
    return array.reduce((total, arr) => [...total, ...arr]);
  }

  function unique(array) {
    return Array.from(new Set(array));
  }

  function getDocsWithIds(querySnapshot) {
    const docs = [];

    querySnapshot.forEach(doc => {
      docs.push(Object.assign(doc.data(), {
        id: doc.id
      }))
    });

    return docs;
  }

  window.utils = {
    numericObjectToArray,
    arrayToNumericObject,
    flattenArray,
    unique,
    getDocsWithIds
  };
})();
