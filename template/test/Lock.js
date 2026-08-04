const { expect } = require("chai")

//describe , it  ,expect 

describe("Testing the math function", function () {


  it("Should add two number correctly", function () {

    let a = 20;
    let b = 10;
    const expectResult = 30;
    const actualResult = a + b;
    expect(expectResult).to.equal(actualResult)
  })

  it("should subtract two number correctly", function () {
    let a = 10;
    let b = 30;
    const expectResult = 20;
    const actualResult = b - a;
    expect(expectResult).to.equal(actualResult);
  })

})
