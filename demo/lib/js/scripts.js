

angular.module('mentio-demo', ['mentio', 'ngRoute'])

    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'examples/examples.html',
                tab: 'examples',
                title: 'Mention examples'
            })
           
            .when('/examples', {
                templateUrl: 'examples/examples.html',
                tab: 'examples',
                title: 'Mention examples'
            });
    })

   

    .controller('mentio-demo-ctrl', function ($scope, $rootScope, $http, $q, $sce, $timeout, mentioUtil) {

        $scope.macros = {
            'brb': 'Be right back',
            'omw': 'On my way',
            'ttul':'Talk To You Later',
            ':)' : '<img src="http://a248.e.akamai.net/assets.github.com/images/icons/emoji/smile.png"' +
                ' height="20" width="20">'
        };

      

        $scope.searchPeople = function(term) {
            var peopleList = [];
            return $http.get('peopledata.json').then(function (response) {
                angular.forEach(response.data, function(item) {
                    if (item.name.toUpperCase().indexOf(term.toUpperCase()) >= 0) {
                        peopleList.push(item);
                    }
                });
                $scope.people = peopleList;
                return $q.when(peopleList);
            });
        };


    

        $scope.getPeopleText = function(item) {
            return '<i style="background:rgba(12,12,12,0.15); cursor:pointer;" >' + item.name + '</i>';
        };

       

        $scope.resetDemo = function() {
 
            // finally enter content that will raise a menu after everything is set up
 
            $timeout(function() {
              var html = "";
                var htmlContent = document.querySelector('#htmlContent');
                if (htmlContent) {
                    var ngHtmlContent = angular.element(htmlContent);
                    ngHtmlContent.html(html);
                    ngHtmlContent.scope().htmlContent = html;
                    // select right after the @
                    mentioUtil.selectElement(htmlContent, [0], 8);
                 //   ngHtmlContent.scope().$apply();
                }
            }, 0);
        };

      
        $scope.resetDemo();
    })

    .directive('contenteditable', ['$sce', function($sce) {
        return {
            restrict: 'A', 
            require: '?ngModel', 
            link: function(scope, element, attrs, ngModel) {
                function read() {
                    var html = element.html();
                    // When we clear the content editable the browser leaves a <br> behind
                    // If strip-br attribute is provided then we strip this out
                   // if (attrs.stripBr && html === '<br>') {
                   //     html = '';
                    //}
                    //ngModel.$setViewValue(html);
                }

                if(!ngModel) return; // do nothing if no ng-model

                // Specify how UI should be updated
                ngModel.$render = function() {
                    if (ngModel.$viewValue !== element.html()) {
                        element.html($sce.getTrustedHtml(ngModel.$viewValue || ''));
                    }
                };

                // Listen for change events to enable binding
                element.on('blur keyup change', function() {
                    scope.$apply(read);
                });
                read(); // initialize
            }
        };
    }]);

