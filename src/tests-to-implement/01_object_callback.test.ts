import { describe, it } from 'mocha'
import { expect } from 'chai'
import sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import { execute, Payload } from '../tests-to-implement/01_object_callback'

describe('object mock callback', () => {
  describe('execute', () => {
    it('calls the callback', () => {
      // Arrange
      let payload: Payload = createPayload();

      let fake = sinon.fake();
      sinon.replace(payload, "callback", fake)
      // Act
      execute(payload);

      // Assert
      expect(fake).called;
    })

    it('calls the callback once', () => {
      // Arrange
      let payload: Payload = createPayload();

      let fake = sinon.fake();
      sinon.replace(payload, "callback", fake)
      // Act
      execute(payload);

      // Assert
      expect(fake).calledOnce;
    })
    
    it('calls the callback once', () => {
      // Arrange
      let payload: Payload = createPayload();
      let called = false;

      sinon.stub(payload, 'callback').callsFake(() => {
        called = true;
      })
      // Act
      execute(payload);

      // Assert
      expect(called).to.be.true;
    })

    it('calls the callback with correct value', () => {
      // Arrange
      let payload: Payload = createPayload();

      let fake = sinon.spy();
      sinon.replace(payload, "callback", fake)
      // Act
      execute(payload);

      // Assert
      expect(fake).calledWith("12340 for asdf")
    })
  })
})
function createPayload(): Payload {
  return {
    id: "asdf",
    amount: 1234,
    callback: () => { }
  }
}

