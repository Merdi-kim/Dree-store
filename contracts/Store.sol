//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract StoreContract is ERC721 {

    using Counters for Counters.Counter;
    Counters.Counter private storeIds;

    struct Item {
        string metadata;
        uint256 price;
        uint256 ordersMade;
        bool listed;
    }

    mapping(uint256 => mapping(uint256 => Item)) private stores;

    event CreatedStore( uint256 itemId, string metadata, string category );
    event PostedItem( uint256 itemId, uint256 itemPrice, bool listingSatus);
    event PriceUpdated(uint256 itemId, uint256 newPrice);
    event ChangeListingStatus(uint256  itemId, bool status);

    constructor() ERC721("Dree Store", "DST") public {}

    function createStore(string memory _metadata, string memory _category) external {
        storeIds.increment();
        uint256 storeId = storeIds.current();
        _mint(msg.sender, storeId);
        emit CreatedStore(storeId, _metadata, _category);
    }

    function postItem(string memory _metadata, uint256 _storeId, uint256 _price) external {
        require(_exists(_storeId), "store doesn't exist");
        require(msg.sender == ownerOf(_storeId), "not your store");
        stores[_storeId][4] = Item(_metadata, _price, 0, true);
        emit PostedItem(4, _price, true);
    }

    function buyItem(uint256 _storeId, uint256 _itemId) external payable {
        require(_exists(_storeId), "store doesn't exist");
        address storeOwner = ownerOf(_storeId);
        Item memory itemToBuy = stores[_storeId][_itemId];
        require(msg.value == itemToBuy.price, "Wrong amount");
        payable(storeOwner).transfer(msg.value);
        itemToBuy.ordersMade = itemToBuy.ordersMade + 1;
    }

    function changeItemPrice(uint256 _storeId, uint256 _itemId, uint256 _newPrice) external {
        require(_exists(_storeId), "store doesn't exist");
        require(msg.sender == ownerOf(_storeId), "not your store");
        Item memory itemToModify = stores[_storeId][_itemId];
        require(itemToModify.price != _newPrice, "price should be different");
        itemToModify.price = _newPrice;
        emit PriceUpdated(_itemId, _newPrice);
    }

    function changeListingStatus(uint256 _storeId, uint256 _itemId) external {
        require(_exists(_storeId), "store doesn't exist");
        require(msg.sender == ownerOf(_storeId), "not your store");
        Item memory itemToModify = stores[_storeId][_itemId];
        itemToModify.listed = !itemToModify.listed;
        emit ChangeListingStatus(_itemId, itemToModify.listed);
    }

    function deleteStore(uint256 _storeId) external {
        require(_exists(_storeId), "store doesn't exist");
        require(msg.sender == ownerOf(_storeId), "not your store");
        _burn(_storeId);
    }
}