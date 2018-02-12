console.log('running test 1');
describe('Something abstract', function () {
  describe('Something specific', function () {
    it('Expects truth to be true', function () {
      expect(true).toBe(true, 'Expectation failed');
    });
  });
});
