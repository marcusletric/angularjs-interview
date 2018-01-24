angular.module('templates', []).run(['$templateCache', function($templateCache) {$templateCache.put('components/note/note.component.html','<div class="note" ng-style="{\'background-color\': noteObj.color, top: noteObj.position.y + \'px\', left: noteObj.position.x + \'px\'}">\r\n    <div class="note-header">\r\n        {{::noteObj.header}}\r\n        <button ng-click="deleteNote()">X</button>\r\n    </div>\r\n    <div class="note-text-container">\r\n        <textarea ng-model="noteObj.text"></textarea>\r\n    </div>\r\n</div>');
$templateCache.put('pages/home/home.component.html','<section>\r\n    <h1>Welcome to notes app</h1>\r\n    <note-component ng-repeat="note in $ctrl.notes track by $index" note-obj="note" index="$index"></note-component>\r\n</section>');}]);