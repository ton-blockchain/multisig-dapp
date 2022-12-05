const nacl = tonweb.utils.nacl

let id = 0
let orders = 0

let reciv = []
let summv = []
let bodyv = []

if (localStorage.getItem('network') === null) localStorage.setItem('network', 'main');

if (localStorage.getItem('network') == 'main') {
    window.tonweb = tonwebMainnet
}
else {
    window.tonweb = tonwebTestnet
}

const sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

const doSearch = async () => {
    let address = $('.search-input').val()
    try {
        const code = (await tonweb.provider.getExtendedAddressInfo(address)).account_state.code
        if (code != "te6cckECKwEABBoAART/APSkE/S88sgLAQIBIAIDAgFIBAUE2vIgxwCOgzDbPOCDCNcYIPkBAdMH2zwiwAAToVNxePQOb6Hyn9s8VBq6+RDyoAb0BCD5AQHTH1EYuvKq0z9wUwHwCgHCCAGDCryx8mhTFYBA9A5voSCYDqQgwgryZw7f+COqH1NAufJhVCOjU04gIyEiAgLMBgcCASAMDQIBIAgJAgFmCgsAA9GEAiPymAvHoHN9CYbZ5S7Z4BPHohwhJQAtAKkItdJEqCTItdKlwLUAdAT8ArobBKAATwhbpEx4CBukTDgAdAg10rDAJrUAvALyFjPFszJ4HHXI8gBzxb0AMmACASAODwIBIBQVARW77ZbVA0cFUg2zyCoCAUgQEQIBIBITAXOxHXQgwjXGCD5AQHTB4IB1MTtQ9hTIHj0Dm+h8p/XC/9eMfkQ8qCuAfQEIW6TW3Ey4PkBWNs8AaQBgJwA9rtqA6ADoAPoCAXoCEfyAgPyA3XlP+AXkegAA54tkwAAZrhlXOFnBANVmdqHsQAIBIBYXAgEgGBkBUbclW2eGJkZqRhAIHoHN9DHCTYRaQAAzGmHmLgBa4CYcC2/uHAt3dG4QIwGJtVmbZ4ar4G/tscbKInAIHo+N9KQRxKBaQAAxw4QQAhrkJLrgZPZFFhOZADniyoQAkAgeiGBSJhxSJhxSJlxANmJczYowIwIBIBobABe1BrXOEEA1WZ2oexACASAcHQIDmTgeHwERrBptni+BtglAIwAVrflBAMyVdqHsGEABDak2zwVXwWAjABet3CzcIIBqsztQ9iACINs8AvJl+ABQQ3FDE9s87VQjKgAK0//TBzAEoNs8L65TILDyYhKxAqQls1McubAlgQDhqiOgKLyw8mmCAYag+AEFlwIREAI+PjCOjREQH9s8QNd49EMQvQXiVBZbVHPnVhBT3Ns8VHEKVHq8JCUoJgAg7UTQ0x/TB9MH0z/0BPQE0QBeAY4aMNIAAfKj0wfTB1AD1wEg+QEF+QEVuvKkUAPgbCEh10qqAiLXSbryq3BUIBMADAHIy//LBwTW2zztVPgPcCVuU4m+sZgQbhAtUMdfB48bMFQkA1BN2zxQVaBGUBBJEDpLCVO52zxQVBZ/4vgAB4MloY4sJoBA9JZvpSCUMFMDud4gjhY4OTkI0gABl9MHMBbwBwWRMOJ/CAcFkmwx4rPmMAYqJygpAGBwjikD0IMI1xjTB/QEMFMWePQOb6HypdcL/1RFRPkQ8qauUiCxUgO9FKEjbuZsIjIAflIwvo4gXwP4AJMi10qYAtMH1AL7AALoMnDIygBAFIBA9EMC8AeOF3HIywAUywcSywdYzwFYzxZAE4BA9EMB4gEgjooQRRA0QwDbPO1Ukl8G4ioAHMjLH8sHywfLP/QA9ADJhLWsTA==") {
            throw true;
        }
        window.location.href = "wallet.html?" + address
    }
    catch {
        alert('not a multisig') 
    }
}

const goNew = () => {
    window.location.href="new.html"
}

const addNew = () => {
    id += 1
    let pkph = 'Public key or address ' + id
    let pkid = 'pubkey_' + id
    let delid = 'pubkey_del_' + id
    let delfncallid = 'delOld(' + id + ')'
    $('.new-main-wrapper')[0].insertAdjacentHTML('beforeend', '<input type="text" class="new-input" value="">')
    $('.new-input')[id - 1].setAttribute('placeholder', pkph)
    $('.new-input')[id - 1].setAttribute('id', pkid)
    $('.new-main-wrapper')[0].insertAdjacentHTML('beforeend', '<div class="new-del-button"><i class="fa-solid fa-xmark"></i></div>')
    $('.new-del-button')[id - 1].setAttribute('id', delid)
    $('.new-del-button')[id - 1].setAttribute('onclick', delfncallid)
}

const delOld = (e) => {
    console.log(e)

    delid = e
    pkid = '#pubkey_' + e
    deldiv = '#pubkey_del_' + e
    $(deldiv)[0].remove()
    $(pkid)[0].remove()
    l = $('.new-input').length

    for (let i = 0; i < l; i++) {
        updid = $('.new-input')[i].id.slice(7)
        updidins = 'pubkey_' + (updid - 1)
        upddelid = 'pubkey_del_' + (updid - 1)
        updlblins = 'Public key or address ' + (updid - 1)
        delfncallid = 'delOld(' + (updid - 1) + ')'
        
        if (updid > delid) {
            $('.new-input')[i].setAttribute('id', updidins)
            $('.new-input')[i].setAttribute('placeholder', updlblins)
            $('.new-del-button')[i].setAttribute('id', upddelid)
            $('.new-del-button')[i].setAttribute('onclick', delfncallid)
        }
    }
    id -= 1
    console.log(id)
}

const order = async (task) => {
    if (task == 2) {
        if (orders > 0) {
            await orderSaveToFile()
        }
        else {
            alert('You did not save any transactions yet')
        }
        return
    }

    if (orders < 4) {
        let reci = $('#recipient')[0].value
        let summ = $('#summ')[0].value
        let body = $('#body')[0].value

        $('#recipient')[0].value = ''
        $('#summ')[0].value = ''
        $('#body')[0].value = ''
        
        if (reci == '') {
            alert('Address can not be empty')
        }
        else {
            try {
                new tonweb.Address(reci)
            }
            catch {
                alert("Please, input correct address")
                return
            }

            if (isNaN(summ)) {
                alert("Please, input correct amount")
                return
            }

            orders += 1
            reciv.push(reci)
            summv.push(summ)
            bodyv.push(body)
            
            if (summ >= 1e9) {
                summ = Math.floor(summ / 1e7) / 100
                summ = summ.toString() + 'B'
            }
            else if (summ >= 1e6) {
                summ = Math.floor(summ / 1e4) / 100
                summ = summ.toString() + 'M'
            }
            
            let divins = '<div onclick="orderInsert(' + orders + ')"><span class="wallet-create-show-spadd">' + reci.slice(0,3) + '..' + reci.slice(-3) + '</span><span class="wallet-create-show-spamm">' + summ + '</span><i class="fa-solid fa-xmark" onclick="orderDelete(' + orders + ')"></i></div>'
            
            $('.wallet-create-show')[0].insertAdjacentHTML('beforeend', divins)
        }
    }
    else {
        alert("You can't save more than 4 orders")
    }
}

const orderDelete = (id) => {
    reciv.splice(id - 1, 1)
    summv.splice(id - 1, 1)
    bodyv.splice(id - 1, 1)
    $('.wallet-create-show > div')[id - 1].remove()
    orders -= 1
    for (let i = id-1 ; i < orders; i++) {
        idred = 'orderDelete(' + (i + 1) + ')'
        $('.wallet-create-show > div > i')[i].setAttribute('onclick', idred)
        idred = 'orderInsert(' + (i + 1) + ')'
        $('.wallet-create-show > div')[i].setAttribute('onclick', idred)
    }
}

const orderSaveToFile = async () =>  {
    let reci = $('#recipient')[0].value
    let summ = $('#summ')[0].value
    let body = $('#body')[0].value
    $('#recipient')[0].value = ''
    $('#summ')[0].value = ''
    $('#body')[0].value = ''

    messages = []

    while (orders > 0) {
        messages.push(await createInternalMessage(reciv[0], tonweb.utils.toNano(summv[0]), false, bodyv[0]))
        orderDelete(1)
    }

    let order = await createOrder(messages)

    const boc = await order.toBoc(false)
    const blob = new Blob([boc])
    
    saveAs(blob, 'order.boc')
}

const orderInsert = (id) => {
    if (id <= orders) {
        console.log(reciv, summv, bodyv)
        $('#recipient')[0].value = reciv[id - 1]
        $('#summ')[0].value = summv[id - 1]
        $('#body')[0].value = bodyv[id - 1]
        for (let i = 0; i < orders; i++) {
            $('.wallet-create-show > div')[i].setAttribute('style', '')
        }
        $('.wallet-create-show > div')[id - 1].setAttribute('style', 'border: 2px solid #0088CC;')
    }
}

const showInfo = (File) => {
    const reader = new FileReader()
    reader.addEventListener('load', event => {
        const bocString = event.target.result
        const boc = tonweb.boc.Cell.oneFromBoc(new Uint8Array(bocString))

        window.multisig_order_boc = boc

        const query_id = boc.bits.readUint(64)

        unt = boc.refs.length
        rec = []
        amo = []
        bod = []
        sem = []
        exc = []

        for (let i = 0; i < boc.refs.length; i += 1) {
            let mode = boc.bits.readUint(8).toNumber()
            let msg = boc.refs[i]
            msg.bits.readBits(6 + 3)
            
            const destAddressRaw = msg.bits.readInt(8) + ':' + msg.bits.readBits(256)
            const destAddress = new tonweb.utils.Address(destAddressRaw).toString(true, true, true, false)

            const valueBytes = msg.bits.readUint(4)
            const value = msg.bits.readUint(valueBytes * 8).toNumber()

            const extraCurrenciesBool = msg.bits.readBit()
            let extraCurrencies = 'empty'
            if (extraCurrenciesBool) {
                extraCurrencies = 'not empty'
            }

            msg.bits.readBits(4 + 4 + 64 + 32 + 1 + 1)
            let body = msg.refs[0]
            body.bits.readCursor = 0
            const opcode = body.bits.readUint(32)

            const commentBytes = body.bits.readBits(body.bits.length - body.bits.readCursor)
            const comment = new TextDecoder().decode(commentBytes.array)
            
            console.log(mode, destAddress, value, comment)
            rec.push(destAddress)
            amo.push(tonweb.utils.fromNano(value.toString()))
            bod.push(comment)
            sem.push(mode)
            exc.push('empty')
        }

        $('.wallet-ordinfo😁')[0].value = ''
        $('.wallet-ordinfo😁')[0].insertAdjacentHTML('beforeend', '<span>Order info:</span>')

        while (unt != 0) {
            unt -= 1
            ins = '<div class="wallet-ordinfo-ord🤠"><span class="wallet-ordinf-ord-posname">Recipient:</span><span class="poscontent-block wallet-ordinf-ord-poscontent">' + rec[unt] + '</span><span class="wallet-ordinf-ord-posname">Amount:</span><span class="wallet-ordinf-ord-poscontent">' + amo[unt] + '</span><span class="wallet-ordinf-ord-posname">Body:</span><span class="poscontent-block wallet-ordinf-ord-poscontent">' + bod[unt] + '</span><span class="wallet-ordinf-ord-posname">Send mode:</span>'
            if(sem[unt] == "1337"){
                ins += '<span class="wallet-ordinf-ord-poscontent" style="color:red;">' + sem[unt] + '</span><span class="wallet-ordinf-ord-posname">Extra currencies:</span>'
            }
            else ins += '<span class="wallet-ordinf-ord-poscontent">' + sem[unt] + '</span><span class="wallet-ordinf-ord-posname">Extra currencies:</span>'
            if(exc[unt] != "empty"){
                ins += '<span class="wallet-ordinf-ord-poscontent" style="color:red;">' + exc[unt] + '</span></div>'
            }
            else ins += '<span class="wallet-ordinf-ord-poscontent">' + exc[unt] + '</span></div>'
            $('.wallet-ordinfo😁')[0].insertAdjacentHTML('beforeend', ins)
        }
    })
    reader.readAsArrayBuffer(File)
}

const styleClear = () => {
    for (let i = 0; i < orders; i++) {
        $('.wallet-create-show > div')[i].setAttribute('style', '')
    }
}

const createWallet = async  () => {
    let pubkeys = []
    for (const inp of $('.new-input')) {
        try {
            new tonweb.Address(inp.value)
            const pkey = (await tonweb.call(inp.value, 'get_public_key')).stack[0][1].substr(2)
            if (tonweb.utils.hexToBytes(pkey).length != 32) {
                throw false
            }
            pubkeys.push(pkey)
        }
        catch (e) {
            console.log(e)
            pubkeys.push(inp.value)
        }
    }

    console.log(pubkeys)

    //if pubckeys elements are empty - alert and return
    if (pubkeys.length == 0) {
        alert('Please, enter at least one public key')
        return
    }

    //if elements in pubkeys are empty strings - alert and return
    for (let i = 0; i < pubkeys.length; i++) {
        if (pubkeys[i] == '') {
            alert('Please, fill all public keys')
            return
        }
    }

    //check if there is no same public keys
    for (let i = 0; i < pubkeys.length; i++) {
        for (let j = i + 1; j < pubkeys.length; j++) {
            if (pubkeys[i] == pubkeys[j]) {
                alert('Please, enter different public keys')
                return
            }
        }
    }

    const wc = $('#workchain_id')[0].value,
          wallet_id = $('#wallet_id')[0].value,
          k = $('#k_value')[0].value

    console.log(wc, wallet_id, k)

    //if wc, wallet_id, k are empty - return
    if (!wc || !wallet_id || !k) {
        alert('Fill all fields')
        return
    }

    const contract = await newMultisig(pubkeys, wc, wallet_id, k)
    await contract.getAddress()

    console.log(contract.address.toString(true, true, false))

    //check is ton is defined
    if (typeof ton === 'undefined') {
        alert('Install any TON wallet extension')
        return
    }

    const address = (await ton.send('ton_requestAccounts'))[0]

    const lastTxHash = (await tonweb.getTransactions(address, 1))[0].transaction_id.hash

    startLoading()

    await ton.send('ton_sendTransaction', [{
            to: contract.address.toString(true, true, false),
            value: '50000000'
        }]
    )

    let txHash = (await tonweb.getTransactions(address, 1))[0].transaction_id.hash

    while (txHash == lastTxHash) {
        txHash = (await tonweb.getTransactions(address, 1))[0].transaction_id.hash
        await sleep(1000)
    }

    const deployTx = contract.deploy()
    console.log(await deployTx.send())

    const multisigAddress = contract.address.toString(true, true, true)
    
    endLoading();

    window.location.href = "wallet.html?" + multisigAddress
}

const roundNumber = (n, r) => {
    if (r == 0) return Math.floor(n)
    return (Math.floor((n + Number.EPSILON) * (10 ** r)) / (10 ** r))
}

const formatTime = (t) => {
    if (t < 60) return roundNumber(t, 0) + ' second' + (t >= 2 ? 's' : '')
    t /= 60
    if (t < 60) return roundNumber(t, 0) + ' minute' + (t >= 2 ? 's' : '')
    t /= 60
    if (t < 24) return roundNumber(t, 0) + ' hour' + (t >= 2 ? 's' : '')
    t /= 24
    if (t < 30) return roundNumber(t, 0) + ' day' + (t >= 2 ? 's' : '')
    t /= 30
    if (t < 12) return roundNumber(t, 0) + ' month' + (t >= 2 ? 's' : '')
    t /= 12
    return roundNumber(t, 0) + ' year' + (t >= 2 ? 's' : '')
}

const startLoading = () => {
    $('.loading')[0].setAttribute('style', '')
}

const endLoading = () => {
    $('.loading')[0].setAttribute('style', 'display: none;')
}

const loadIndex = async () => {
    if(localStorage.getItem('network') == 'test'){
        $('#1337')[0].setAttribute('checked', 'true')
        $('#1337')[0].setAttribute('onclick', 'changeNetwork(true)')
    }

    $('.search-input').on('keyup', e => {
        if (e.key === 'Enter' || e.keyCode === 13) doSearch()
    })
    $('#search_go').click(doSearch)
    $('#search_new').click(goNew)
    $('.new-main-wrapper')[0].insertAdjacentHTML('beforeend', '<input type="text" class="new-input" value="" placeholder="Public key or address 1" id="pubkey_1">')
    $('.new-main-wrapper')[0].insertAdjacentHTML('beforeend', '<div class="new-del-button" id="pubkey_del_1" onclick="delOld(1)"><i class="fa-solid fa-xmark"></i></div>')
    $('.new-main-wrapper')[0].insertAdjacentHTML('beforeend', '<input type="text" class="new-input" value="" placeholder="Public key or address 2" id="pubkey_2">')
    $('.new-main-wrapper')[0].insertAdjacentHTML('beforeend', '<div class="new-del-button" id="pubkey_del_2" onclick="delOld(2)"><i class="fa-solid fa-xmark"></i></div>')
}

const loadNew = async () => {
    $('.new-add-button').click(addNew)
    addNew()
    addNew()
    if(localStorage.getItem('network') == 'test'){
        $('#1337')[0].setAttribute('checked', 'true')
        $('#1337')[0].setAttribute('onclick', 'changeNetwork(true)')
    }
}

const loadWallet = async () => {
    if(localStorage.getItem('network') == 'test'){
        $('#1337')[0].setAttribute('checked', 'true')
        $('#1337')[0].setAttribute('onclick', 'changeNetwork(true)')
    }
    console.log('loadwallet!!!')
    console.log(window.location)
    addr = window.location.href.split("?")[1]
    window.multisig_address = addr
    $('.wallet-address').text(addr)
    const r = await tonweb.provider.getExtendedAddressInfo(addr)
    console.log(r.balance, roundNumber(Number(r.balance) / 1e9, 2))
    let balance = roundNumber(Number(r.balance) / 1e9, 2).toString()
    let lastTxHash = r.last_transaction_id.hash
    let lastTxHashBytes = tonweb.utils.base64ToBytes(lastTxHash)
    let lastTxHashHex = tonweb.utils.bytesToHex(lastTxHashBytes)
    console.log(lastTxHash)

    const s = (await tonweb.call(addr, 'get_n_k')).stack
    const n = Number(s[0][1])
    const k = Number(s[1][1])

    const t = (await tonweb.provider.getTransactions(addr, 1, undefined, lastTxHash, undefined, true))[0].utime
    const d = (new Date()) / 1000 - t

    console.log(d, '!!!')

    $('#balance').text('Balance: ' + balance + ' TON')
    $('#owners').text('Owners: ' + n + ' / ' + k)
    $('#last_active').text('Last active: ' + formatTime(d) + ' ago')

    let data = (await tonweb.provider.getAddressInfo(addr)).data
    let dataBoc = tonweb.boc.Cell.oneFromBoc(tonweb.utils.base64ToBytes(data))
    window.multisig_wallet_id = dataBoc.bits.readUint(32).toNumber()
    dataBoc.bits.readBits(8 + 8 + 64)
    let owners = new tonweb.boc.HashMap(8)
    owners.loadHashMapX2Y(dataBoc.refs[0], s => tonweb.boc.CellParser.loadUint(s, 8), (s) => {
        const pubkey = tonweb.boc.CellParser.loadUint(s, 256)
        const flood = tonweb.boc.CellParser.loadUint(s, 8)
        return pubkey.words
    })
    owners = owners.elements
    console.log(owners)

    const address = (await ton.send('ton_requestAccounts'))[0]

    data = (await tonweb.provider.getAddressInfo(address)).data
    dataBoc = tonweb.boc.Cell.oneFromBoc(tonweb.utils.base64ToBytes(data))
    dataBoc.bits.readBits(64)
    const pubkey = dataBoc.bits.readUint(256).words
    
    for (const o_i in owners) {
        if (JSON.stringify(owners[o_i]) == JSON.stringify(pubkey)) {
            window.multisig_owner_id = o_i
            break
        }
    }

    console.log(window.multisig_owner_id)
}

const signAndSendReload = async () => {
    await signAndSend(window.multisig_order_boc)
    $('.wallet-ordinfo😁')[0].value = ''
    await sleep(6100)
    await loadWallet()
}

const changeNetwork = (old) => {
    //console.log(old)
    if (old) {
        localStorage.setItem('network', 'main')
        window.tonweb = tonwebMainnet
        $('#1337')[0].setAttribute('onclick', 'changeNetwork(false)')
        //Тут надо поменять сеть на mainnet


        console.log('network: ' + localStorage.getItem('network'))
    } else {
        localStorage.setItem('network', 'test')
        window.tonweb = tonwebTestnet
        $('#1337')[0].setAttribute('onclick', 'changeNetwork(true)')
        //Ну тут соответственно на тестнет 

        
        console.log('network: ' + localStorage.getItem('network'))
    }
}