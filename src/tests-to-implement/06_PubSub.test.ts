import { describe, it } from 'mocha'
import { default as sinon } from 'sinon'
import { expect } from 'chai'
import { PubSub } from '../tests-to-implement/06_PubSub'

describe('PubSub', () => {
  describe('subscribe', () => {
    it('calls subscription callback when publish occurs on channel', async () => {
      // Arrange
      let sut = new PubSub();
      let capturedPayload = "";
      
      let testCallBack: any;
      let promiseToWaitFor = new Promise((resolve, reject) => {
        testCallBack = (payload: string) => {
          capturedPayload = payload;
          resolve(capturedPayload);
        }
      });

      sinon.stub()

      sut.subscribe("testChannel", testCallBack);

      // Act
      await sut.publish("testChannel", "testPayload");

      // Assert
      await promiseToWaitFor;
      
      expect(capturedPayload).to.equal("testPayload");
    })

    it('calls all subscription callbacks when publish occurs on channel', async () => {
      // Arrange
      // Act
      // Assert
    })
  })
})
