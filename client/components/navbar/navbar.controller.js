'use strict';

angular.module('paizatterApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth, $timeout, $state) {
    $scope.menu = [
      {
        'title': 'All',
        'link': function(){return '/';},
        'show': function(){return true;},
      },
      {
        'title': 'Mine',
        'link': function(){return '/users/' + Auth.getCurrentUser()._id;},
        'show': Auth.isLoggedIn,
      },
      {
        'title': 'Starred',
        'link': function(){return '/users/' + Auth.getCurrentUser()._id + '/starred';},
        'show': Auth.isLoggedIn,
      },
    ];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };

    $scope.search = function(keyword) {
      if ($state.current.controller === 'MainCtrl'){
        $state.go($state.current.name, {keyword: keyword}, {reload: true});
      }else{
        $state.go('main', {keyword: keyword}, {reload: true});
      }
    };

  });