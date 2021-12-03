const Blockchain = require('.');
const Block = require('./block');

describe('Blockchain', () => {
    let bc, bc2;

    beforeEach(() => {
        bc = new Blockchain();
        bc2 = new Blockchain();
    });

    it('starts with genesis block', () => {
        expect(bc.chain[0]).toEqual(Block.genesis())
    });

    it('Add a new block', () => {
        const data = 'foo';
        bc.addBlock(data);

        expect(bc.chain[bc.chain.length - 1].data).toEqual(data)
    });

    it('Validates a valid chain', () => {
        bc2.addBlock('foo');

        expect(bc.isValidChain(bc2.chain)).toBe(true);
    });

    it('Invalidates a chain with a corrupt genesis block', () => {
        bc2.chain[0].data = 'bad data';

        expect(bc.isValidChain(bc2.chain)).toBe(false);
    });

    it('Invalidates a corrupt chain', () => {
        bc2.addBlock('foo');
        bc2.chain[1].data = 'not foo';

        expect(bc.isValidChain(bc2.chain)).toBe(false);
    });

    it('Replace the chain with new chain', () => {
        bc2.addBlock('goo');
        bc.replaceChain(bc2.chain);

        expect(bc.chain).toEqual(bc2.chain);
    });

    it('Dose not nreplace the chain with one of less than or equal to length', () => {
        bc.addBlock('foo');
        bc.replaceChain(bc2.chain);

        expect(bc.chain).not.toEqual(bc2.chain);
    });
})