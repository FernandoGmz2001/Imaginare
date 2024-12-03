// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Users is Ownable {
    uint256 private _userIds;

    struct User {
        string firstName;
        string lastName;
        uint256 amountSpent;
        uint256 userId;
        uint256[] nftUploadIds; // Array de IDs de uploads
    }

    constructor() Ownable(msg.sender) {}

    mapping(uint256 => User) public users;

    function insertUser(
        string memory firstName,
        string memory lastName
    ) public onlyOwner returns (uint256) {
        _userIds++;
        uint256 newUserId = _userIds;
        User memory newUser = User(
            firstName,
            lastName,
            0,
            newUserId,
            new uint256[](0));
        users[newUserId] = newUser;
        return newUserId;
    }

    function getUsers() public view returns (User[] memory) {
        User[] memory userArray = new User[](_userIds);
        for (uint256 i = 0; i < _userIds; i++) {
            User storage user = users[i + 1];
            userArray[i] = user;
        }
        return userArray;
    }

    function getUserId(uint256 userId) public view returns (User memory) {
        return users[userId];
    }

    function register(uint256 userId, uint256 amount) public onlyOwner {
        users[userId].amountSpent += amount;
    }

    function addNftUploadId(uint256 _userId, uint256 _nftId) public {
        require(users[_userId].userId == _userId, "User does not exist");
        users[_userId].nftUploadIds.push(_nftId);
    }
}
