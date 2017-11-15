describe('Note component', function() {
    var $rootScope, $compile;

    beforeEach(module('templates'));
    beforeEach(module('note'));

    beforeEach(inject(function(_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it('should display a note with colour, header and text', function () {

    });
});