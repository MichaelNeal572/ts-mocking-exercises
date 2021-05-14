import { PricingService } from '../dependencies/PricingService'
import { ItemPriceAdjuster } from '../tests-to-implement/03_class_dependency_injected_into_sut'

let createItem = (price: number)=> {
  return {  id: 'asdf',
            name: '',
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

       let pricingService = new PricingService()
       spyOn(pricingService, 'getMarkUpPercentage').and.resolveTo(100);

       let sut = createSut(pricingService);
       
       // Act
       let result = await sut.adjustPrice(item);
 
       // Assert
       expect(result.price).toEqual(198);
    })
  })

  describe('price is greater than 100', () => {
    it('marks item price down by the markdown percentage', async () => {
       // Arrange
       let item = createItem(150);

       let pricingService = new PricingService()
       spyOn(pricingService, 'getMarkDownPercentage').and.resolveTo(50);

       let sut = createSut(pricingService);
       
       // Act
       let result = await sut.adjustPrice(item);
 
       // Assert
       expect(result.price).toEqual(75);
    })
  })

  describe('price is equal to 100', () => {
    it('will not alter the price', async () => {
      // Arrange
      let item = createItem(100);

      let sut = createSut();
      
      // Act
      let result = await sut.adjustPrice(item);

      // Assert
      expect(result.price).toEqual(100);
    })
  })
})
