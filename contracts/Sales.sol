// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import '@openzeppelin/contracts/access/Ownable.sol';

contract Sales is Ownable {
    uint256 private _salesIds;

    struct SaleStruct {
        uint256 saleId;
        uint256 userId;
        string[] items;
        uint256[] prices;
    }

    mapping(uint256 => SaleStruct) public sales;
constructor() Ownable(msg.sender) {

    }
    function getSales() public view returns (SaleStruct[] memory) {
        SaleStruct[] memory salesArray = new SaleStruct[](_salesIds);
        for (uint256 i = 0; i < _salesIds; i++) {
            SaleStruct storage sale = sales[i + 1];
            salesArray[i] = sale;
        }
        return salesArray;
    }

    function insertSale(uint256 userId, string[] memory items, uint256[] memory prices) public onlyOwner returns (uint256) {
        _salesIds += 1;
        uint256 newSaleId = _salesIds;
        SaleStruct memory newSale = SaleStruct(newSaleId, userId, items, prices);
        sales[newSaleId] = newSale;
        return newSaleId;
    }

    function getSaleById(uint256 saleId) public view returns (SaleStruct memory) {
        return sales[saleId];
    }

    function getSalesByUserId(uint256 userId) public view returns (SaleStruct[] memory) {
        uint256 totalSales = _salesIds;
        uint256 count = 0;

        // First pass to count the matching sales
        for (uint256 i = 0; i < totalSales; i++) {
            if (sales[i + 1].userId == userId) {
                count++;
            }
        }

        // Allocate array with the correct size
        SaleStruct[] memory salesArray = new SaleStruct[](count);
        uint256 index = 0;

        // Second pass to fill the array
        for (uint256 i = 0; i < totalSales; i++) {
            if (sales[i + 1].userId == userId) {
                salesArray[index] = sales[i + 1];
                index++;
            }
        }

        return salesArray;
    }
}
