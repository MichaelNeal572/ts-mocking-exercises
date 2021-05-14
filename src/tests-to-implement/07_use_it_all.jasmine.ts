import { ItemProcessor } from "../tests-to-implement/07_use_it_all"
import { InMemoryCache } from '../dependencies/InMemoryCache'
import { ItemRepository } from '../dependencies/ItemRepository'
import { PubSub } from "./06_PubSub";

describe('ItemProcessor', () => {
  let createInMemoryCache = ()=> new InMemoryCache();
  let createItemRepository = ()=> new ItemRepository();
  
  let createSut = (cache: InMemoryCache = createInMemoryCache(), 
  repo: ItemRepository = createItemRepository()) => 
  new ItemProcessor(cache, repo);

  let createItem = (id:string, name: string,price: number, description: string,
    created: Date) => {
      return {
        id: id,
        name: name,
        price: price,
        description: description,
        created: created
      }
  };

  async function listenForCall(callback: jasmine.Spy){
    return new Promise<void>((resolve) => {
      callback.and.callFake(() => {
        resolve();
      })
    })
  }
  async function listenForCall2(callback: jasmine.Spy){
    return new Promise<void>((resolve) => {
      callback.and.callFake((argument) => {
        resolve();
      }).and.callFake(() => {})
    })
  }

  

  describe('processItems', () => {
    it('will not process items if processing is already busy', async () => {
      // Arrange
      let sut = createSut();
      sut["isProcessing"] = true;

      let spy = spyOn<any>(sut, 'getUnprocessedItems').and.returnValues([]);

      // Act
      await sut.processItems();

      // Assert
      expect(spy).toHaveBeenCalledTimes(0);
    })

    describe('given single unprocessed item', () => {
      it('updates the cache with the item', async () => {
        // Arrange
        let item = createItem("id","name",1234,"desc",new Date());

        let testRepo = createItemRepository();
        let testCache = createInMemoryCache();
        let cacheSpy = spyOn(testCache, 'update');

        PubSub.getInstance().subscribe('item:updated', ()=>{})

        let repoSpy = spyOn(testRepo, 'getAll').and.returnValue(
          [item]
        );
        
        let sut = createSut(testCache, testRepo);

        // Act
        await sut.processItems();

        // Assert
        expect(cacheSpy).toHaveBeenCalledWith(item);
      })

      it('publishes an item updated message', async () => {
        // Arrange
        let item = createItem("id","name",1234,"desc",new Date());

        let testRepo = createItemRepository();
        let testCache = createInMemoryCache();
        let cacheSpy = spyOn(testCache, 'update');
        let pubSubSpy = spyOn(PubSub.prototype, 'publish');

        PubSub.getInstance().subscribe('item:updated', ()=>{})

        let repoSpy = spyOn(testRepo, 'getAll').and.returnValue(
          [item]
        );
        
        let sut = createSut(testCache, testRepo);

        // Act
        await sut.processItems();

        // Assert
        expect(pubSubSpy).toHaveBeenCalledWith('item:updated', item);
      })

      it('does not process items that have already been processed', async () => {
        //Arrange
        let item = createItem("id","name",1234,"desc",new Date());

        let testRepo = createItemRepository();
        let testCache = createInMemoryCache();
        let cacheSpy = spyOn(testCache, 'update');
        let pubSubSpy = spyOn(PubSub.prototype, 'publish');

        PubSub.getInstance().subscribe('item:updated', ()=>{})

        let repoSpy = spyOn(testRepo, 'getAll').and.returnValue(
          [item],
        );
        
        let sut = createSut(testCache, testRepo);

        // Act
        
        await sut.processItems();
        await sut.processItems();

        // Assert
        expect(pubSubSpy).toHaveBeenCalledTimes(1);
      })
      
    })

    describe('given newly added unprocessed items', () => {
      it('processes all newly added items every x seconds', async () => {
        //Arrange
        jasmine.clock().install()
        let item = createItem("first","first",1234,"first",new Date());
        let item2 = createItem("second","second",12234,"second",new Date());

        let newSpy = jasmine.createSpy();
        let promiseItem = Promise.resolve(item);

        let testRepo = createItemRepository();
        let testCache = createInMemoryCache();

        let pubSubSpy = spyOn(PubSub.prototype, 'publish');
        
        PubSub.getInstance().subscribe('item:updated', ()=>{})

        let repoSpy = spyOn(testRepo, 'getAll').and.returnValues(
          [item],[item2]);
        
        let sut = createSut(testCache, testRepo);

        // Act
        await sut.processItems();
        expect(pubSubSpy).toHaveBeenCalledTimes(1);
        jasmine.clock().tick(5001);
        let cacheSpy = spyOn(testCache, 'update');
        let callback2Called = listenForCall(cacheSpy);
        await callback2Called;
        // Assert
        expect(pubSubSpy).toHaveBeenCalledTimes(2);
        jasmine.clock().uninstall();
      })
    })

    describe('given multiple unprocessed items', () => {
      it('updates the cache with the item', async () => {
        //Arrange
        let item = createItem("id","name",1234,"desc",new Date());
        let item2 = createItem("id3","na3me",12334,"d3esc",new Date());

        let testRepo = createItemRepository();
        let testCache = createInMemoryCache();
        let cacheSpy = spyOn(testCache, 'update');
        let pubSubSpy = spyOn(PubSub.prototype, 'publish');

        PubSub.getInstance().subscribe('item:updated', ()=>{})

        let repoSpy = spyOn(testRepo, 'getAll').and.returnValue(
          [item,item2],
        );
        
        let sut = createSut(testCache, testRepo);

        // Act
        
        await sut.processItems();

        // Assert
        expect(cacheSpy).toHaveBeenCalledTimes(2);
        expect(cacheSpy).toHaveBeenCalledWith(item);
        expect(cacheSpy).toHaveBeenCalledWith(item2);
      })

      it('publishes an item updated message', async () => {
        //Arrange
        let item = createItem("id","name",1234,"desc",new Date());
        let item2 = createItem("id3","na3me",12334,"d3esc",new Date());

        let testRepo = createItemRepository();
        let testCache = createInMemoryCache();
        let cacheSpy = spyOn(testCache, 'update');
        let pubSubSpy = spyOn(PubSub.prototype, 'publish');

        PubSub.getInstance().subscribe('item:updated', ()=>{})

        let repoSpy = spyOn(testRepo, 'getAll').and.returnValue(
          [item,item2],
        );
        
        let sut = createSut(testCache, testRepo);

        // Act
        
        await sut.processItems();

        // Assert
        expect(pubSubSpy).toHaveBeenCalledTimes(2);
        expect(pubSubSpy).toHaveBeenCalledWith('item:updated',item);
        expect(pubSubSpy).toHaveBeenCalledWith('item:updated',item2);
      })

      it('does not process items that have already been processed', async () => {
        let item = createItem("id","name",1234,"desc",new Date());
        let item2 = createItem("id3","na3me",12334,"d3esc",new Date());

        let testRepo = createItemRepository();
        let testCache = createInMemoryCache();
        let cacheSpy = spyOn(testCache, 'update');
        let pubSubSpy = spyOn(PubSub.prototype, 'publish');

        PubSub.getInstance().subscribe('item:updated', ()=>{})

        let repoSpy = spyOn(testRepo, 'getAll').and.returnValues(
          [item,item2],[item,item2]
        );
        
        let sut = createSut(testCache, testRepo);

        // Act
        
        await sut.processItems();
        await sut.processItems();

        // Assert
        expect(pubSubSpy).toHaveBeenCalledTimes(2);
        expect(pubSubSpy).toHaveBeenCalledWith('item:updated',item);
        expect(pubSubSpy).toHaveBeenCalledWith('item:updated',item2);
      })
    })
  })
})
