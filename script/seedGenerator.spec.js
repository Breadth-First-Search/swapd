const chai = require('chai')
const expect = chai.expect
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
chai.use(sinonChai)

const {
  fakeUsers,
  fakeServices,
  generateUsers,
  generateServices
} = require('./seedGenerator')

describe('Seed Generator', () => {
  beforeEach(() => {
    sinon.spy(generateUsers)
    sinon.spy(generateServices)
  })

  it('expect users and services to have the same length', () => {
    expect(fakeUsers.length).to.be.equal(fakeServices.length)
  })

  it('expect generateUsers to be called once', () => {
    expect(generateUsers.calledOnce)
    expect(generateServices.calledOnce)
  })
})
