define([], function () {
  var ROOM_NAME = 'chat';
  var POST_EVENT = ROOM_NAME + '/message';

  function chatRepository($q) {
    var safePromise = function (callback) {
      try {
        return $q.when(callback());
      } catch (e) {
        return $q.reject(e);
      }
    }
    var fetchAllMessages = function (memory) {
      throw new Error("Not implemented: fetchAllMessages");
    };
    var postMessage = function (memory, message) {
      throw new Error("Not implemented: postMessage");
    };
    var listenForMessages = function (memory, callback) {
      throw new Error("Not implemented: listenForMessages");
    };
    this.withSocket = function (socket) {
      socket.join(ROOM_NAME);
      var socketRoom = socket.to(ROOM_NAME);
      socket.on(POST_EVENT, function (data, from) {

      });

      var defer = $q.defer();
      var promise = defer.promise;
      var knownMessages = [];
      var addMessages = function (messages) {
        knownMessages.push.apply(knownMessages, messages);
        defer.notify(messages);
      }
      safePromise(function () {
        return fetchAllMessages(memory);
      })
        .then(addMessages, function (err) {
          defer.reject(err);
        });
      return {
        getAll: function () {
          return knownMessages.slice();
        },
        onMessage: function (callback) {
          promise.then(null, null, callback);
        },
        error: function (callback) {
          promise.then(null, callback);
        },
        post: function (message) {
          socketRoom.emit(POST_EVENT, {
            text: message
          });
        },
        cleanup: function () {
          defer.resolve();
          socket.leave(ROOM_NAME);
        }
      };
    };
  }
  return ['$q', chatRepository];
});