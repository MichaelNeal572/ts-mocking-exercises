import { describe, it } from 'mocha'
import { expect } from 'chai'
import sinon from 'sinon'
import { ItemPriceAdjusterVersion2 } from '../tests-to-implement/04_class_dependency_initialized_within_sut'
import { PricingService } from '../dependencies/PricingService'

describe('ItemPriceAdjusterVersion2', () => {
  let createItem = (price: number)=> {
    return {  id: 'asdf',
              name: '',
              price: price,
              description: '1234',
              created: new Date()
    }
  }
  
  let createSut = () => new ItemPriceAdjusterVersion2();
  describe('price is less than 100', () => {
    it('marks item price up by the markup percentage', async () => {
      // Arrange
      var item = createItem(99);
      
      var sut = createSut();

      sinon.stub(PricingService.prototype, 'getMarkUpPercentage').resolves(100)

      // Act
      var result = await sut.adjustPrice(item);

      // Assert
      expect(result.price).eqls(198);
    })
  })

  describe('price is greater than 100', () => {
    it('marks item price down by the markdown percentage', async () => {
      // Arrange
      var item = createItem(101);
      
      var sut = createSut();

      sinon.stub(sut['pricingService'], 'getMarkDownPercentage').resolves(100)

      // Act
      var result = await sut.adjustPrice(item);

      // Assert
      expect(result.price).eqls(0);
    })
  })
  
  describe('price is greater than 100', () => {
    it('marks item price down by the markdown percentage', async () => {
      // Arrange
      var item = createItem(102);
      
      var sut = createSut();

      sinon.stub(sut['pricingService'], 'getMarkDownPercentage').resolves(100)

      // Act
      var result = await sut.adjustPrice(item);

      // Assert
      expect(result.price).eqls(0);
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
      expect(result.price).eqls(100);
    })
  })
})
