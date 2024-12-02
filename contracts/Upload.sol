// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Uploads is Ownable {
    uint256 private _uploadIds;

    struct Upload {
        uint256 uploadId;
        string fileName;
        string filePath;
        uint256 userId;
    }

    mapping(uint256 => Upload) public uploads;

    constructor() Ownable(msg.sender) {}

    function insertUpload(
        string memory fileName,
        string memory filePath,
        uint256 userId
    ) public onlyOwner returns (uint256) {
        _uploadIds++;
        uint256 newUploadId = _uploadIds;
        uploads[newUploadId] = Upload(newUploadId,fileName, filePath, userId);
        return newUploadId;
    }

    function getUploads() public view returns (Upload[] memory) {
        Upload[] memory uploadsArray = new Upload[](_uploadIds);
        for (uint256 i = 0; i < _uploadIds; i++) {
            Upload storage upload = uploads[i + 1];
            uploadsArray[i] = upload;
        }
        return uploadsArray;
    }

    function getUserUploads(uint256 userId) public view returns (Upload[] memory) {
        uint256 count;
        // First, count how many uploads the user has
        for (uint256 i = 1; i <= _uploadIds; i++) {
            if (uploads[i].userId == userId) {
                count++;
            }
        }
        
        // Create an array for the user's uploads
        Upload[] memory userUploads = new Upload[](count);
        uint256 index = 0;
        
        // Now, populate the array with the user's uploads
        for (uint256 i = 1; i <= _uploadIds; i++) {
            if (uploads[i].userId == userId) {
                userUploads[index] = uploads[i];
                index++;
            }
        }
        return userUploads;
    }

    function getUploadById(uint256 uploadId) public view returns (Upload memory) {
        require(uploadId > 0 && uploadId <= _uploadIds, "Upload does not exist");
        return uploads[uploadId];
    }
}