
const validate   = require('./validate.js')


const exit = jest.spyOn(process, 'exit');

test('concac', () => {


    const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {});
    myFunc(condition);
    expect(mockExit).toHaveBeenCalledWith(ERROR_CODE);
    validate('test')
    expect(exit).toHaveBeenCalledWith("1");

    
});