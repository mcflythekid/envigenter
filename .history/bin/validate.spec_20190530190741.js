
const validate   = require('./validate.js')

const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {});

test('must fail', () => {
    validate('fail')
    expect(mockExit).toHaveBeenCalledWith(1);
})

test('must success', () => {
    validate('success')
    expect(mockExit).not.toHaveBeenCalledTimes(0);
})