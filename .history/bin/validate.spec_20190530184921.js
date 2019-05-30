
const validate   = require('./validate.js')



test('concac', () => {


    const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {});
    validate('test')
    expect(mockExit).toHaveBeenCalledWith(1);

    
});