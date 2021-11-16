const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const { interface, bytecode } = require('../compile');

//change for later test/prod ethereum provider
const web3 = new Web3(ganache.provider());

let accounts;
let inbox;
const INITIAL_STRING = 'Test message'

beforeEach(async () => {
    //Get a list of all accounts
    accounts =  await web3.eth.getAccounts();
    //Use one of those accounts to deploy
    inbox = await new web3.eth.Contract(JSON.parse(interface))
            .deploy({ data: bytecode, arguments: [INITIAL_STRING] })
            .send({ from: accounts[0], gas: '1000000' })
});

describe('Inbox', () => {
    it('deploys a contract', () => {
        //ok -> is that a defined value
        assert.ok(inbox.options.address);
    });

    it('has a default message', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, INITIAL_STRING);
    });

    it('can change the message', async () => {
        await inbox.methods.setMessage('new message').send({ from: accounts[0], gas: '1000000' });
        const message = await inbox.methods.message().call();
        assert.equal(message, 'new message');
    });
});