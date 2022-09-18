const tonweb = new window.TonWeb()

const multisig_code = 'B5EE9C7241010401004F000114FF00F4A413F4BCF2C80B0102012002030004D230006EF28308D71820D31FED44D0D31FD3FFD15131BAF2A103F901541042F910F2A2F8005120D74A96D307D402FB00DED1A4C8CB1FCBFFC9ED540C233AE6'

class MultisigContract extends tonweb.Contract {
    constructor (provider, options) {
        options.code = Cell.oneFromBoc(multisig_code)
        super(provider, options)
    }

    createDataCell () {
        var cell = new tonweb.boc.Cell()
        cell.bits.writeUint(this.options.wallet_id, 32)
        cell.bits.writeUint(this.options.n, 8)
        cell.bits.writeUint(this.options.k, 8)
        cell.bits.writeUint(this.options.last_cleaned, 64)
        cell.writeCell(this.options.owner_infos)
        cell.bits.writeBit(0)
        return cell
    }

    createSigningMessage (options) {

    }
}

const newMultisig = (pubkeys, wc, wallet_id, k) => {
    const contract = new MultisigContract(tonweb.provider, {
        wc: wc,
        wallet_id: wallet_id,
        k: k,
        n: pubkeys.length,
        last_cleaned: 0,
        owner_infos: owner_infos
    })
}
