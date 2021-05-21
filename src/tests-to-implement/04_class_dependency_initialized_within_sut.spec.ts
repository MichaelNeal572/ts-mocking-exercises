import { describe, expect, it } from '@jest/globals'
import { ItemPriceAdjusterVersion2 } from '../tests-to-implement/04_class_dependency_initialized_within_sut'
import { PricingService } from '../dependencies/PricingService'
import sinonChai from 'sinon-chai'

describe('ItemPriceAdjusterVersion2', () => {
  
  describe('price is less than 100', () => {
    it('marks item price up by the markup percentage', async () => {
      
    })
  })

  describe('price is greater than 100', () => {
    it.skip('marks item price down by the markdown percentage', async () => {
      // Arrange
      // Act
      // Assert
    })
  })

  describe('price is equal to 100', () => {
    it.skip('will not alter the price', async () => {
      // Arrange
      // Act
      // Assert
    })
  })
})
