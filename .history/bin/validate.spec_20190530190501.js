
const validate   = require('./validate.js')

const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {});

test('must fail', () => {

    validate('test')
    expect(mockExit).toHaveBeenCalledWith(1);

    
});