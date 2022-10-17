const tonweb = new TonWeb()
const nacl = tonweb.utils.nacl

let id = 2
let orders = 0

let reciv = []
let summv = []
let bodyv = []

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

const order = (task) => {
    if(orders < 4){
        let reci = $('#recipient')[0].value
        /*
        if reci не адрес
            alert("Pleas, input correct address")
            return
        */
        let summ = $('#summ')[0].value
        if(isNaN(summ)){
            alert("Please, input correct amount")
            return
        }
        let body = $('#body')[0].value

        $('#recipient')[0].value = ''
        $('#summ')[0].value = ''
        $('#body')[0].value = ''
        
        if(reci == '' || summ == '' || body == ''){
            if(task == 2 && orders != 0){
                orderSend()
            }
        }
        else{
            orders += 1
            reciv.push(reci)
            summv.push(summ)
            bodyv.push(body)
            
            if(summ >= 1e9){
                summ = Math.floor(summ / 1e7) / 100
                summ = summ.toString() + 'B'
            }
            else if(summ >= 1e6){
                summ = Math.floor(summ / 1e4) / 100
                summ = summ.toString() + 'M'
            }
            
            let divins = '<div onclick="orderInsert(' + orders + ')"><span class="wallet-create-show-spadd">' + reci.slice(0,3) + '..' + reci.slice(-3) + '</span><span class="wallet-create-show-spamm">' + summ + '</span><i class="fa-solid fa-xmark" onclick="orderDelete(' + orders + ')"></i></div>'
            
            $('.wallet-create-show')[0].insertAdjacentHTML('beforeend', divins)
            if(task == 2){
                orderSend()                
            }
        }
    }
    else{
        alert("You can't save more than 4 orders")
    }
}

const orderDelete = (id) => {
    reciv.splice(id-1)
    summv.splice(id-1)
    bodyv.splice(id-1)
    $('.wallet-create-show > div')[id-1].remove()
    orders -= 1
    for (let i = id-1 ; i < orders; i++){
        idred = 'orderDelete(' + (i+1) + ')'
        $('.wallet-create-show > div > i')[i].setAttribute('onclick', idred)
        idred = 'orderInsert(' + (i+1) + ')'
        $('.wallet-create-show > div')[i].setAttribute('onclick', idred)
    }
}

const orderSend = () =>  {
    let reci = $('#recipient')[0].value
    let summ = $('#summ')[0].value
    let body = $('#body')[0].value
    $('#recipient')[0].value = ''
    $('#summ')[0].value = ''
    $('#body')[0].value = ''

    //тут взять из reciv summv и bodyv, запаковать в файлик и скинуть юзеру

    for (let i = orders; i > 0; i--){
        orderDelete(i);
    }
}

const orderInsert = (id) => {
    if(id <= orders){
        $('#recipient')[0].value = reciv[id-1]
        $('#summ')[0].value = summv[id-1]
        $('#body')[0].value = bodyv[id-1]
        for(let i = 0; i < orders; i++){
            $('.wallet-create-show > div')[i].setAttribute('style', '')
        }
        $('.wallet-create-show > div')[id-1].setAttribute('style', 'border: 2px solid #0088CC;')
    }
}

const styleClear = () => {
    for(let i = 0; i < orders; i++){
        $('.wallet-create-show > div')[i].setAttribute('style', '')
    }
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

const loadIndex = async () => {
    $('.search-input').on('keyup', e => {
        if (e.key === 'Enter' || e.keyCode === 13) doSearch()
    })
    $('#search_go').click(doSearch)
    $('#search_new').click(goNew)
    $('.new-main-wrapper')[0].insertAdjacentHTML('beforeend', '<input type="text" class="new-input" value="" placeholder="Public key 1" id="pubkey_1">')
    $('.new-main-wrapper')[0].insertAdjacentHTML('beforeend', '<div class="new-del-button" id="pubkey_del_1" onclick="delOld(1)"><i class="fa-solid fa-xmark"></i></div>')
    $('.new-main-wrapper')[0].insertAdjacentHTML('beforeend', '<input type="text" class="new-input" value="" placeholder="Public key 2" id="pubkey_2">')
    $('.new-main-wrapper')[0].insertAdjacentHTML('beforeend', '<div class="new-del-button" id="pubkey_del_2" onclick="delOld(2)"><i class="fa-solid fa-xmark"></i></div>')
}

const loadNew = async () => {
    $('.new-add-button').click(addNew)
}

const loadWallet = async () => {
    console.log(window.location)
    addr = window.location.href.split("?")[1]
    $('.wallet-address').text(addr)
    const r = (await (await fetch('https://api.ton.cat/v2/explorer/getWalletInformation?address=' + addr)).json()).result
    console.log(r.balance, roundNumber(Number(r.balance) / 1e9, 2))
    let balance = roundNumber(Number(r.balance) / 1e9, 2).toString()
    let lastTxHash = r.last_transaction_id.hash

    const s = (await (await fetch('https://toncenter.com/api/v2/runGetMethod', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            address: addr,
            method: 'get_n_k',
            stack: []
        })
    })).json()).result.stack
    const n = Number(s[0][1])
    const k = Number(s[1][1])

    await sleep(1100)

    const t = (await (await fetch('https://toncenter.com/api/index/getTransactionByHash?include_msg_body=false&tx_hash=' + lastTxHash)).json())[0].utime
    const d = (new Date()) / 1000 - t

    $('#balance').text('Balance: ' + balance + ' TON')
    $('#owners').text('Owners: ' + n + ' / ' + k)
    $('#last_active').text('Last active: ' + formatTime(d) + ' ago')
}