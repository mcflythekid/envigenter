
const validate   = require('./validate.js')


const exit = jest.spyOn(process, 'exit');

test('concac', () => {
    
    expect(exit).toHaveBeenCalledWith(1);
    validate('test')
});