import { ItemPriceAdjusterVersion2 } from '../tests-to-implement/04_class_dependency_initialized_within_sut'
import { PricingService } from '../dependencies/PricingService'

let createItem = (price: number)=> {
  return {  id: 'asdf',
            name: '',
            price: price,
            description: '1234',
            created: new Date()
  }
}

let createSut = () => new ItemPriceAdjusterVersion2();


describe('ItemPriceAdjusterVersion2', () => {
  describe('price is less than 100', () => {
    it('marks item price up by the markup percentage', async () => {
      // Arrange
      var item = createItem(50);
      
      var sut = createSut();

      spyOn(PricingService.prototype, 'getMarkUpPercentage').and.resolveTo(100)

      // Act
      var result = await sut.adjustPrice(item);

      // Assert
      expect(result.price).toBe(100);
    })
  })

  describe('price is greater than 100', () => {
    it('marks item price down by the markdown percentage', async () => {
      // Arrange
      var item = createItem(150);
      
      var sut = createSut();

      spyOn(PricingService.prototype, 'getMarkDownPercentage').and.resolveTo(50)

      // Act
      var result = await sut.adjustPrice(item);

      // Assert
      expect(result.price).toBe(75);
    })
  })

  describe('price is equal to 100', () => {
    it('will not alter the price', async () => {
      // Arrange
      var item = createItem(100);
      var sut = createSut();

      // Act
      var result = await sut.adjustPrice(item);

      // Assert
      expect(result.price).toBe(100);
    })
  })
})
