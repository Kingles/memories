define([], function() {


    function s3upload($http, MomentFileSigResource, UserResource) {
        var directiveDefinitionObject = {
            priority: 0,
            replace: false,
            transclude: false,
            templateUrl: 'templates/directives/s3upload.html',
            restrict: 'E',
            scope: {
                url: '=',
                prefix: '@'
            },
            link: function(scope, iElement) {

                //var statusElem = iElement.find(".upload_status");
                var previewElem = iElement.find(".fileupload-preview");
                var fileElem = iElement.find(".upload_files");
                fileElem.on("change", uploadFile);


                function uploadFile(event) {
                    var file = event.target.files[0];
                    var fileType = file.type;
                    var fileKey = scope.prefix + file.name;
                    MomentFileSigResource.get({
                        "s3_object_name": fileKey,
                        "s3_object_type": fileType
                    }).$promise.then(function(creds) {
                        $http.put(creds.signedUrl, file, {
                            headers: {
                                'Authorization': function() {
                                    return null;
                                },
                                "Content-Type": fileType
                            }
                        }).success(function() {
                            scope.url = creds.publicUrl;
                            previewElem.innerHTML = "<img src='" + creds.publicUrl + "'>";

                        });

                    });
                }
            }
        };
        return directiveDefinitionObject;
    }

    return ['$http', 'MomentFileSigResource', 'UserResource', s3upload];
});
