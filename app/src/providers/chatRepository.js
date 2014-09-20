define([], function () {
  function chatRepository(pouchDB) {
    var db = pouchDB('chat');

    this.getAll = function () {
      return db.allDocs({
        include_docs: true,
        descending: true
      });
    }
  }
  return ['pouchDB', chatRepository];
});