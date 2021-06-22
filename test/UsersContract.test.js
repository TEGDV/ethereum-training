const assert = require('assert');
const Web3 = require('web3');
const AssertionError = require('assert').AssertionError;
const web3 = new Web3("HTTP://127.0.0.1:7545");

const {abi, bytecode} = require("../scripts/compile");
let accounts;
let usersContract;

beforeEach(async() => {
  accounts = await web3.eth.getAccounts();
  usersContract = await new web3.eth.Contract(abi)
    .deploy({ data: bytecode })
    .send({from: accounts[0], gas: '1000000'})
})

describe('The UsersContract', async () => {
  it('Should deploy', async () => {
    assert.ok(usersContract.options.address);
  })
  
    it('should join user', async () => {
      let name = "Jair";
      let surName = "Aguilar";
      await usersContract.methods.join(name,surName)
        .send({from:accounts[0],gas:'500000'});
    })
  
    it('should retrieve a user', async () => {
      
      let name = "Jair";
      let surName = "Aguilar";

      await usersContract.methods.join(name,surName)
        .send({from:accounts[0],gas:'500000'});

      let user = await usersContract.methods.getUser(accounts[0]).call();
      assert.equal(name, user[0])
      assert.equal(surName, user[1])

    })
  
  it('should not allow join twice', async () => {
      await usersContract.methods.join("Chuponsito","El Payaso")
        .send({from:accounts[1],gas:'500000'})
      try{
        await usersContract.methods.join("Platanito","Chow")
          .send({from:accounts[1],gas:'500000'})
        assert.fail("same account can't join twice");
      }
    catch(e){
      e instanceof AssertionError && assert.fail(e.message);
    }
    })

  
    it('User lenght returns the correct number of users', async () => {
      await usersContract.methods.join("Chuponsito","El Payaso")
        .send({from:accounts[1],gas:'500000'})
      let userLength = await usersContract.methods.totalUsers().call()
      assert.equal(userLength, 1)
    })
  
    it('Joined users should be detected', async () => {
      await usersContract.methods.join("Chuponsito","El Payaso")
        .send({from:accounts[1],gas:'500000'})

      let isJoined = await usersContract.methods.userJoined(accounts[1]).call();
      assert(isJoined);
      let isNotJoined = await usersContract.methods.userJoined(accounts[2]).call();
      assert(!isNotJoined);
    })
})
