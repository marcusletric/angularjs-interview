angular
    .module('note', [])
    .directive('noteComponent', [function () {
        return {
            templateUrl: 'components/note/note.component.html',
            scope: {
                noteObj: '<',
                index: '<'
            },
            link: noteLink,
            controller: noteController
        }
    }]);


noteController.$inject = ['$scope'];
function noteController ($scope) {
    var $ctrl = this;

    $ctrl.$onInit = function() {
    }
}

function noteLink (scope, element, attrs) {

    element.on('mousemove', handleMove);
    element.on('mouseup', resetCoords);
    element.on('mousedown', selectForMove);

    var previousCoords = null;
    var moving = false;

    function handleMove(event) {
        if(moving) {
            if(previousCoords) {
                var delta = {
                    x: event.screenX - previousCoords.x,
                    y: event.screenY - previousCoords.y
                };
                scope.noteObj.position.y += delta.y;
                scope.noteObj.position.x += delta.x;
                scope.$digest();
            }
            previousCoords = {x: event.screenX, y: event.screenY};
        }
    }

    function resetCoords() {
        previousCoords = null;
        moving = false;
    }

    function selectForMove() {
        moving = true;
    }

    function invokeLast() {

    }
}