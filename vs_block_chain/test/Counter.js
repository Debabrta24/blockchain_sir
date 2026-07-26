const { expect } = require("chai");

describe("testing the math Function", function () {


    it("Should add two number correctly ", function () {
        let a = 10;
        let b = 20;
        const expectedResult = 30;
        const actualResult = a + b;

        expect(expectedResult).to.equal(actualResult)
    })
    it("should subtract numebr correctly", function () {
        let a = 10;
        b = 30;
        const expectedResult = 20;
        const actualResult = b - a;
        expect(expectedResult).to.equal(actualResult);

    })

})