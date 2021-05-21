import { describe, it, beforeEach, afterEach } from 'mocha'
import { expect } from 'chai'
import sinon from 'sinon'
import { generateDayMessage } from '../tests-to-implement/05_fake_timers'

describe('generateDayMessage', () => {
  it('returns a message containing the current time', () => {
    // Arrange
    let clock = sinon.useFakeTimers();
    clock.setSystemTime(new Date(2020,12,20,1,30,30));
    // Act
    var result = generateDayMessage();

    // Assert
    expect(result).to.contain('[1:30:30 AM]');
  })

  it('returns a message containing the current time after some time has elapsed', () => {
    // Arrange
    let clock = sinon.useFakeTimers();
    clock.setSystemTime(new Date(2020,12,20,1,30,30));

    // Act
    clock.tick(30000);
    var result = generateDayMessage();

    // Assert
    expect(result).to.contain('[1:31:00 AM]');
  })

  it('returns a message containing "Monday" on Mondays', () => {
    // Arrange
    let clock = sinon.useFakeTimers();
    clock.setSystemTime(new Date("2021/04/26"));

    // Act
    var result = generateDayMessage();

    // Assert
    expect(result).to.contain('Monday');
  })

  it('returns a message containing "Tuesday" on Tuesdays', () => {
    // Arrange
    let clock = sinon.useFakeTimers();
    clock.setSystemTime(new Date("2021/04/27"));

    // Act
    var result = generateDayMessage();

    // Assert
    expect(result).to.contain('Tuesday');
  })

  it('returns a message containing "Wednesday" on Wednesdays', () => {
    // Arrange
    let clock = sinon.useFakeTimers();
    clock.setSystemTime(new Date("2021/04/28"));

    // Act
    var result = generateDayMessage();

    // Assert
    expect(result).to.contain('Wednesday');
  })

  it('returns a message containing "Thursday" on Thursdays', () => {
    // Arrange
    let clock = sinon.useFakeTimers();
    clock.setSystemTime(new Date("2021/04/29"));

    // Act
    var result = generateDayMessage();

    // Assert
    expect(result).to.contain('Thursday');
  })

  it('returns a message containing "Friday" on Fridays', () => {
    // Arrange
    let clock = sinon.useFakeTimers();
    clock.setSystemTime(new Date("2021/04/30"));

    // Act
    var result = generateDayMessage();

    // Assert
    expect(result).to.contain('Friday');
  })

  for(let i = 1; i< 15; i+=7){
    it(`returns a message containing "Saturday" on Saturdays (${i})`, () => {
      // Arrange
      let clock = sinon.useFakeTimers();
      clock.setSystemTime(new Date(`2021/05/${i}`));

      // Act
      var result = generateDayMessage();

      // Assert
      expect(result).to.contain('Saturday');
    })
  }

  it('returns a message containing "Sunday" on Sundays', () => {
    // Arrange
    let clock = sinon.useFakeTimers();
    clock.setSystemTime(new Date("2021/05/02"));

    // Act
    var result = generateDayMessage();

    // Assert
    expect(result).to.contain('Sunday');
  })
})
