const BaseModel = require('./baseModel.js')

describe('baseModel constructor', () => {
  const base = new BaseModel()
  it('should return a baseModel instance', () => {
    expect(base instanceof BaseModel).toBe(true)
  })
})
