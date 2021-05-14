import { getAllItemsOnSale } from '../tests-to-implement/02_function_return_value'
import { getAll } from "../dependencies/get_all"
import * as dependencies from "../dependencies/get_all"

let createItem = (price: number)=> {
  return {  id: 'asdf',
            name: '',
            price: price,
            description: '1234',
            created: new Date()
  }
}

describe('function mock return value', () => {
  describe('getAllItemsOnSale', () => {
    it('returns only prices under 10', async () => {
      // Arrange
      
      let expectedItems = [createItem(9), createItem(8)]
      let unexpecteditem = createItem(1234);

      spyOn(dependencies, 'getAll').and.resolveTo(Promise.resolve([
        ...expectedItems, unexpecteditem
      ]));
      
      // Act
      let result = await getAllItemsOnSale()
      // Assert
      expect(result).toEqual(expectedItems);
    })
  })
})
