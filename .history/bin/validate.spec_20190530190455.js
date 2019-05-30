
const validate   = require('./validate.js')

const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {});

test('concac', () => {

    validate('test')
    expect(mockExit).toHaveBeenCalledWith(1);

    
});