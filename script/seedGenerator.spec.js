const chai = require('chai')
const expect = chai.expect
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
chai.use(sinonChai)
const {
  fakeUsers,
  fakeServices,
  fakeUserInterests,
  generateUsers,
  generateServices,
  generateUserInterests
} = require('./seedGenerator')

describe('Seed Generator', () => {
  beforeEach(() => {
    sinon.spy(generateUsers)
    sinon.spy(generateServices)
    sinon.spy(generateUserInterests)
  })

  it('expect users/services/userInterests to have the same length', () => {
    expect(fakeUsers.length).to.be.equal(fakeServices.length)
    expect(fakeServices.length).to.be.equal(fakeUserInterests.length)
  })

  it('expect generateUsers to be called once', () => {
    expect(generateUsers.calledOnce)
    expect(generateServices.calledOnce)
    expect(generateUserInterests.calledOnce)
  })
})
