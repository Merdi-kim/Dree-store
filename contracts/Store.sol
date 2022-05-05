//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Store {

    event Postitem( uint256 itemId, uint256 itemPrice);

    function postItem(string memory _metadata, uint256 _price) external {

    }

    function buyItem(uint256 _id) external payable {

    }

    function changeItemPrice(uint256 _id) external {

    }

    function changeListingStatus(uint256 _id) external {

    }
}