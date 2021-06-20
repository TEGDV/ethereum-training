// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UsersContract {
  // it returns default values if the key wasn't founded
  event onJoin(address,string);
  
  struct User{
    string name;
    string surName;
  }
  mapping(address => User) private users;
  mapping(address => bool) private joinedUsers;
  address[] private total;

  function join(string memory name, string memory surName) public{
    require(!userJoined(msg.sender));
    User storage user = users[msg.sender]; // Memory indicates to the var that it can't be stored in the contract and storage does opposite
    user.name = name;
    user.surName = surName;
    joinedUsers[msg.sender] = true;
    total.push(msg.sender);
    emit onJoin(msg.sender,string(abi.encodePacked(name," ", surName)));
  }

  function getUser(address _who) public view returns(string memory, string memory){
    require(userJoined(_who));
    User memory user = users[_who];  
    return(user.name,user.surName);
  }
  function userJoined(address _who) private view returns(bool){
    return joinedUsers[_who];
  } 
  function totalUsers()public view returns(uint){
    return total.length;
  }
}
