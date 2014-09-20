define(['pouchdb'], function (PouchDB) {
  function getAllKeys(object) {
    var keys = [];
    while (object != null) {
      for (var ks = Object.keys(object), i = 0, len = ks.length; i < len; ++i) {
        var key = ks[i];
        if (keys.indexOf(key) === -1) {
          keys.push(key);
        }
      }
      object = Object.getPrototypeOf(object);
    }
    return keys;
  }

  function pouchDB($q) {
    return function (dbName) {
      var db = new PouchDB(dbName);
      var exported = {};
      var wrapMethod = function (key) {
        return function () {
          var result = db[key].apply(db, arguments);
          if (result != null && typeof result.then === 'function') {
            return $q.when(result);
          } else {
            return result;
          }
        };
      };
      for (var keys = getAllKeys(db), i = 0, len = keys.length; i < len; ++i) {
        if (typeof db[key] === 'function') {
          exported[key] = wrapMethod(key);
        }
      }
      return exported;
    }
  }
  return ['$q', pouchDB];
});