const path = require("path");
const fs = require("fs");
const solc = require("solc");

const contractPath = path.resolve(__dirname, "../contracts", "UsersContract.sol");
const source = fs.readFileSync(contractPath, "utf8");
// Source https://ethereum.stackexchange.com/questions/86557/solc-js-error-before-each-hook-for-deploys-a-contract-syntaxerror-unexpec
var input = {
    language: 'Solidity',
    sources: {
        'UsersContract.sol' : {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': [ '*' ]
            }
        }
    }
};
// parses solidity to English and strings 
var output = JSON.parse(solc.compile(JSON.stringify(input)));

var outputContracts = output.contracts['UsersContract.sol']['UsersContract']

// exports ABI interface
module.exports.abi = outputContracts.abi;

// exports bytecode from smart contract
module.exports.bytecode = outputContracts.evm.bytecode.object;
