define([
  'src/providers/UserResource',
  'src/providers/MemoryResource'
  'src/providers/chatRepository',
  'src/providers/pouchDB'
], function (UserResource, MemoryResource, chatRepository, pouchDB) {
  return angular.module("memapp.providers", ["ngResource"])
    .factory("UserResource", UserResource)
    .factory("MemoryResource", MemoryResource)
    .service("chatRepository", chatRepository)
    .factory("pouchDB", pouchDB);
});