import { describe, it } from 'mocha'
import { expect } from 'chai'
import sinon from 'sinon'
import { ItemPriceAdjuster } from '../tests-to-implement/03_class_dependency_injected_into_sut'
import { PricingService } from "../dependencies/PricingService"

let createItem = (price: number)=> {
  return {  id: 'asdf',
            name: 'nameASDF',
            price: price,
            description: '1234',
            created: new Date()
  }
}

let createSut = (service:PricingService = new PricingService()) => new ItemPriceAdjuster(service);


describe('ItemPriceAdjuster', () => {
  describe('price is less than 100', () => {
    it('marks item price up by the markup percentage', async () => {
      // Arrange
      let item = createItem(99);

      var pricingService = new PricingService()
      sinon.stub(pricingService, "getMarkUpPercentage").resolves(100);
      
      let sut = createSut(pricingService);
      // Act 
      var result = await sut.adjustPrice(item);

      // Assert
      expect(result.price).to.equal(198);
    })
  })

  describe('price is greater than 100', () => {
    it('marks item price down by the markdown percentage', async () => {
       // Arrange
       let item = createItem(101);

       var pricingService = new PricingService()
       sinon.stub(pricingService, "getMarkDownPercentage").resolves(100);
       
       let sut = createSut(pricingService);
       // Act 
       var result = await sut.adjustPrice(item);
 
       // Assert
       expect(result.price).to.equal(0);
    })
  })

  describe('price is equal to 100', () => {
    it('will not alter the price', async () => {
      // Arrange
      let item = createItem(100);

      let sut = createSut();
      // Act 
      var result = await sut.adjustPrice(item);

      // Assert
      expect(result).to.eql(item);
    })
  })
})
