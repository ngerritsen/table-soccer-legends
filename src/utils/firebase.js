export function getDocsWithIds(querySnapshot) {
  const docs = [];

  querySnapshot.forEach(doc => {
    docs.push(
      Object.assign(doc.data(), {
        id: doc.id
      })
    );
  });

  return docs;
}
