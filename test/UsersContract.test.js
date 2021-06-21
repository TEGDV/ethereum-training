const assert = require('assert');
const Web3 = require('web3');

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
    console.log(usersContract.options.address);
    assert.ok(usersContract.options.address);
  })
})
