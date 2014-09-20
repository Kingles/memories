define(function () {

  function ChatPaneCtrl($scope, chatRepository) {
    $scope.messages = chatRepository.getMessages();
  }

  return ["$scope", "chatRepository", ChatPaneCtrl];
});