
const validate   = require('./validate.js')


const exit = jest.spyOn(process, 'exit');

test('concac', () => {


    const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {});
    validate('test')
    expect(mockExit).toHaveBeenCalledWith(1);

    
});