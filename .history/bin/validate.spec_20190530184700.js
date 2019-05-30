
const validate   = require('./validate.js')


const exit = jest.spyOn(process, 'exit');

test('concac', () => {
    validate('test')
    expect(exit).toHaveBeenCalledWith(1");

    
});