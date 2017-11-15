angular
    .module('home', [
        'note'
    ])
    .component('homeComponent', {
        templateUrl: 'pages/home/home.component.html',
        controller: HomeController
    });

HomeController.$inject = [];
function HomeController() {
    var $ctrl = this;

    $ctrl.$onInit = function () {
        $ctrl.notes = [
            {
                position: {
                    x: 20,
                    y: 40
                },
                color: '#ffd6bc',
                header: "Note 1",
                text: "Test note 1",
            },
            {
                position: {
                    x: 500,
                    y: 40
                },
                color: '#fff8cd',
                header: "Note 2",
                text: "Test note 2"
            }
        ];
    };

    $ctrl.addNote = function() {

    }
}