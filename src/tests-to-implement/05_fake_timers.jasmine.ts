import { generateDayMessage } from '../tests-to-implement/05_fake_timers'

describe('generateDayMessage', () => {
  beforeEach (()=> {
    jasmine.clock().install();
  })
  
  afterEach (() => {
    jasmine.clock().uninstall();
  })
  
  
  it('returns a message containing the current time', () => {
    // Arrange
    
    jasmine.clock().mockDate(new Date(2020,12,20,1,30,30));

    // Act
    var result = generateDayMessage();
    // Assert
    expect(result).toContain('[1:30:30 AM]');
  })

  it('returns a message containing the current time after some time has elapsed', () => {
    // Arrange
    jasmine.clock().mockDate(new Date(2020,12,20,1,30,30));

    // Act
    jasmine.clock().tick(30000);
    var result = generateDayMessage();
    // Assert
    expect(result).toContain('[1:31:00 AM]');
  })

  it('returns a message containing "Monday" on Mondays', () => {
    // Arrange
    
    jasmine.clock().mockDate(new Date("2021/04/26"));

    // Act
    var result = generateDayMessage();
    // Assert
    expect(result).toContain('Monday');
  })

  it('returns a message containing "Tuesday" on Tuesdays', () => {
    jasmine.clock().mockDate(new Date("2021/04/27"));

    // Act
    var result = generateDayMessage();
    // Assert
    expect(result).toContain('Tuesday');
  })

  it('returns a message containing "Wednesday" on Wednesdays', () => {
    jasmine.clock().mockDate(new Date("2021/04/28"));

    // Act
    var result = generateDayMessage();
    // Assert
    expect(result).toContain('Wednesday');
  })

  it('returns a message containing "Thursday" on Thursdays', () => {
    jasmine.clock().mockDate(new Date("2021/04/29"));

    // Act
    var result = generateDayMessage();
    // Assert
    expect(result).toContain('Thursday');
  })

  it('returns a message containing "Friday" on Fridays', () => {
    jasmine.clock().mockDate(new Date("2021/04/30"));

    // Act
    var result = generateDayMessage();
    // Assert
    expect(result).toContain('Friday');
  })

  for(let i = 1; i< 15; i+=7){
    it(`returns a message containing "Saturday" on Saturdays (${i})`, () => {
      jasmine.clock().mockDate(new Date(`2021/05/${i}`));

      // Act
      var result = generateDayMessage();
      // Assert
      expect(result).toContain('Saturday');
    })
  }

  it('returns a message containing "Sunday" on Sundays', () => {
    jasmine.clock().mockDate(new Date("2021/05/02"));

    // Act
    var result = generateDayMessage();
    // Assert
    expect(result).toContain('Sunday');
  })
})
