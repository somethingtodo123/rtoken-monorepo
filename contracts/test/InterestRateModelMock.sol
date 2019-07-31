pragma solidity >=0.4.21 <0.6.0;

import "../../compound/contracts/InterestRateModel.sol";

contract InterestRateModelMock is InterestRateModel {

    /**
      * @notice Gets the current borrow interest rate based on the given asset, total cash, total borrows
      *         and total reserves.
      * @dev The return value should be scaled by 1e18, thus a return value of
      *      `(true, 1000000000000)` implies an interest rate of 0.000001 or 0.0001% *per block*.
      * @param cash The total cash of the underlying asset in the CToken
      * @param borrows The total borrows of the underlying asset in the CToken
      * @param reserves The total reserves of the underlying asset in the CToken
      * @return Success or failure and the borrow interest rate per block scaled by 10e18
      */
    function getBorrowRate(uint cash, uint borrows, uint reserves)
        external view returns (uint success, uint rate) {
        require(reserves <= cash, "reserves more than cash");
        require(borrows <= cash, "borrows more than cash");

        success = 0;
        rate = 1000000000000; /* 0.0001% *per block*. */
    }

    function isInterestRateModel() external view returns (bool) { return true; }

}
