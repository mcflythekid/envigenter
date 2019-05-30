
const validate   = require('./validate.js')



test('concac', () => {


    
    validate('test')
    expect(mockExit).toHaveBeenCalledWith(1);

    
});