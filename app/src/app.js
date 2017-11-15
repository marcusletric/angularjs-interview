angular.module('interview', [
    'ui.router',
    'templates',
    'pages'
])
.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('home', {
        url: "/home",
        component: 'homeComponent'
    });
}])
.run(function($state){
    if(!$state.current.name || $state.current.name == ''){
        $state.go('home', {}, { reload: true });
    }
});
