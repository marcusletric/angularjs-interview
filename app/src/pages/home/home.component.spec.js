describe('Home component',function() {
    var $rootScope, $compile;

    beforeEach(module('templates'));
    beforeEach(module('home'));
    beforeEach(module('note'));

    beforeEach(inject(function(_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it('should display notes', function() {
        var scope = $rootScope.$new();
        var $element = $compile('<home-component></home-component>')(scope);

        $rootScope.$digest();
        expect($element.find('note-component').length).toBe(2);
    });
});