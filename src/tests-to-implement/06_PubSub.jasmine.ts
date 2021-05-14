
import { resolveModuleName } from 'typescript';
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
      sut.subscribe("testChannel", testCallBack);

      // Act
      sut.publish("testChannel", "testPayload");

      // Assert
      await expectAsync(promiseToWaitFor).toBeResolved();
      expect(capturedPayload).toBe("testPayload")
    })

    it('calls all subscription callbacks when publish occurs on channel', async () => {
      // Arrange
      let sut = new PubSub();
      let capturedPayloads: string[] = [];
      
      let promiseCallBack1: any;
      let promiseToWaitFor1 = new Promise((resolve, reject) => {
        promiseCallBack1 = (payload: string) => {
          capturedPayloads.push(payload)
          resolve(payload);
        }
      });
      let promiseCallBack2: any;
      let promiseToWaitFor2 = new Promise((resolve, reject) => {
        promiseCallBack2 = (payload: string) => {
          capturedPayloads.push(payload)
          resolve(payload);
        }
      });
      
      sut.subscribe("testChannel", promiseCallBack1);
      sut.subscribe("testChannel", promiseCallBack2);
      
      // Act
      sut.publish("testChannel", "testPayload");

      // Assert
      await expectAsync(promiseToWaitFor1).toBeResolved();
      await expectAsync(promiseToWaitFor2).toBeResolved();
      expect(capturedPayloads).toEqual(['testPayload','testPayload'])
    
    })

    it('calls all subscription callbacks when publish occurs on channel (alternative)', async () => {
      // Arrange

      let sut = PubSub.getInstance();
      let callback1 = jasmine.createSpy()
      let callback2 = jasmine.createSpy()
      
      let callback1Called = listenForCall(callback1);
      let callback2Called = listenForCall(callback2);
      
      let channel = "testChannel";
      let payload = "testPayload";

      sut.subscribe(channel, callback1);
      sut.subscribe(channel, callback2);
      
      // Act
      sut.publish(channel, payload);

      // Assert
      //await expectAsync(callback1Called).toBeResolved();
      await callback1Called;
      expect(callback1).toHaveBeenCalledWith(payload)
      await callback2Called;
      //await expectAsync(callback2Called).toBeResolved();
      expect(callback2).toHaveBeenCalledWith(payload)
    })
  })

  async function listenForCall(callback: jasmine.Spy){
    return new Promise<void>((resolve) => {
      callback.and.callFake(() => {
        resolve();
      })
    })
  }
})
