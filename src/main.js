let id = 2

const sleep = ms => new Promise(r => setTimeout(r, ms));

const doSearch = () => {
    let address = $('.search-input').val()
    fetch('https://api.ton.cat/v2/explorer/getWalletInformation?address=' + address)
    .then(r => r.json()).then(r => {
        if (r.ok) {
            window.location.href="wallet.html?" + address
        }
    })
}

const goNew = () => {
    window.location.href="new.html"
}

const addNew = () => {
    id += 1
    console.log(id)
    let pkph = 'Public key ' + id
    let pkid = 'pubkey_' + id
    let delid = 'pubkey_del_' + id
    let delfncallid = 'delOld(' + id + ')'
    $('.new-main-wrapper')[0].insertAdjacentHTML('beforeend', '<input type="text" class="new-input" value="">')
    $('.new-input')[id-1].setAttribute('placeholder', pkph)
    $('.new-input')[id-1].setAttribute('id', pkid)
    $('.new-main-wrapper')[0].insertAdjacentHTML('beforeend', '<div class="new-del-button"><i class="fa-solid fa-xmark"></i></div>')
    $('.new-del-button')[id-1].setAttribute('id', delid)
    $('.new-del-button')[id-1].setAttribute('onclick', delfncallid)
    //$('.new-del-button').click(delOld)
}

const delOld = (e) => {
    console.log(e)

    delid = e
    pkid = '#pubkey_' + e
    deldiv = '#pubkey_del_' + e
    $(deldiv)[0].remove()
    $(pkid)[0].remove()
    // console.log($('.new-input').length)
    // console.log(delid + ' ' + (id+1))
    l = $('.new-input').length
    for(let i = 0; i < l ; i++) {
        //console.log($('.new-input')[i].id.slice(7))

        updid = $('.new-input')[i].id.slice(7)
        updidins = 'pubkey_' + (updid-1)
        upddelid = 'pubkey_del_' + (updid-1)
        updlblins = 'Public key ' + (updid-1)
        delfncallid = 'delOld(' + (updid-1) + ')'
        //console.log(updidins)
        if (updid > delid){
            $('.new-input')[i].setAttribute('id', updidins)
            $('.new-input')[i].setAttribute('placeholder', updlblins)
            $('.new-del-button')[i].setAttribute('id', upddelid)
            $('.new-del-button')[i].setAttribute('onclick', delfncallid)
        }
    }
    id -= 1
    console.log(id)
}

const createWallet = async  () => {
    var pubkeys = []
    for (const inp of $('.new-input')) {
        pubkeys.push(inp.value)
    }

    const wc = $('#workchain_id')[0].value,
          wallet_id = $('#wallet_id')[0].value,
          k = $('#k_value')[0].value

    console.log(wc, wallet_id, k)

    const contract = newMultisig(pubkeys, wc, wallet_id, k)
    await contract.getAddress()

    console.log(contract.address.toString(true, true, false))

    const address = (await ton.send('ton_requestAccounts'))[0]

    const lastTxHash = (await tonweb.getTransactions(address, 1))[0].transaction_id.hash

    await ton.send('ton_sendTransaction', [{
            to: contract.address.toString(true, true, false),
            value: '50000000'
        }]
    )

    var txHash = (await tonweb.getTransactions(address, 1))[0].transaction_id.hash
    while (txHash == lastTxHash) {
        await sleep(1500)
        txHash = (await tonweb.getTransactions(address, 1))[0].transaction_id.hash
    }
    await sleep(1500)

    const deployTx = contract.deploy()
    console.log(await deployTx.send())

    const multisigAddress = contract.address.toString(true, true, true)
    // todo: redirect to multisig wallet view page for that address
}

$(window).on('load', () => {
    //for index
    $('.search-input').on('keyup', e => {
        if (e.key === 'Enter' || e.keyCode === 13) doSearch()
    })
    $('#search_go').click(doSearch)
    $('#search_new').click(goNew)

    //for new
    $('.new-add-button').click(addNew)
    //$('.new-del-button').click(delOld)

    //for wallet
    console.log(window.location)
    addr = window.location.href.split("?")
    $('.wallet-address').text(addr[1])
})
