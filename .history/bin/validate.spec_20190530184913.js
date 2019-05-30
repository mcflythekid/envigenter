
const validate   = require('./validate.js')


const exit = jest.spyOn(process, 'exit');

test('concac', () => {


    const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {});
    myFunc(condition);
    
    validate('test')
    expect(exit).toHaveBeenCalledWith("1");

    
});