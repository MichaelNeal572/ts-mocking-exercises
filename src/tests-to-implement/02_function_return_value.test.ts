import { describe, it } from 'mocha'
import { expect } from 'chai'
import sinon from 'sinon'
import { getAllItemsOnSale } from '../tests-to-implement/02_function_return_value'
import * as dependencies from "../dependencies/get_all"

describe('function mock return value', () => {
  describe('getAllItemsOnSale', () => {
    it('returns only prices under 10', async () => {
      const expectedItem = createItem(9)
      // Arrange
      let payloads = [expectedItem,createItem(10),createItem(11)]
      
      sinon.stub(dependencies, "getAll").resolves(payloads);
      // Act
      let result = await getAllItemsOnSale();

      // Assert
      expect(result).to.eql([expectedItem])
    })
  })
  let createItem = (price: number)=> {
    return {  id: 'asdf',
              name: '',
              price: price,
              description: '1234',
              created: new Date()
    }
  }
})
