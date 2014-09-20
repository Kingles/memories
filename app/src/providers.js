define([
  'src/providers/UserResource',
  'src/providers/MemoryResource'
  'src/providers/chatService',
  'src/providers/pouchDB'
], function (UserResource, MemoryResource, chatService, pouchDB) {
  return angular.module("memapp.providers", ["ngResource"])
    .factory("UserResource", UserResource)
    .factory("MemoryResource", MemoryResource)
    .service("chatService", chatService)
    .factory("pouchDB", pouchDB);
});