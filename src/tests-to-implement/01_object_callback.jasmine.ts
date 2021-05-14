import { should } from 'chai';
import { execute, Payload} from '../tests-to-implement/01_object_callback'

let createFake = (callback: (result: string)=>void, amount:number = 10, id:string = "test"):Payload => {

  return {id: id,

  amount: amount,

  callback: callback,}

}

describe('object mock callback', () => {
  describe('execute', () => {
    it('calls the callback', () => {
      // Arrange
      let called =false;
      let fake = createFake((result: string) => called = true);
      
      // Act
      execute(fake);

      // Assert
      expect(called).toBe(true);
    })

    it('calls the callback once', () => {
      // Arrange
      let called =0;
      let fake =createFake((result: string) => called+=1)

      // Act
      execute(fake);

      // Assert
      expect(called).toBe(1);
    })

    it('calls the callback with correct value', () => {
      // Arrange
      let called ="";
      
      let fake = createFake((result: string) => called= result, 11, "not test")
      
      // Act
      execute(fake);
      
      // Assert
      expect(called).toBe("110 for not test");
    })
  })
})
