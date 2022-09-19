let id = 2

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
    $('.new-main-wrapper')[0].insertAdjacentHTML('beforeend', '<input type="text" class="new-input" value="">')
    $('.new-input')[id-1].setAttribute('placeholder', pkph)
    $('.new-input')[id-1].setAttribute('id', pkid)
    $('.new-main-wrapper')[0].insertAdjacentHTML('beforeend', '<div class="new-del-button"><i class="fa-solid fa-xmark"></i></div>')
    $('.new-del-button')[id-1].setAttribute('id', delid)
    $('.new-del-button').click(delOld)
}

const delOld = (e) => {
    //console.log(e)
    
    delid = e.currentTarget.id.slice(11)
    pkid = '#pubkey_' + delid
    deldiv = '#pubkey_del_' + delid
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
        //console.log(updidins)
        if (updid > delid){
            $('.new-input')[i].setAttribute('id', updidins)
            $('.new-input')[i].setAttribute('placeholder', updlblins)
            $('.new-del-button')[i].setAttribute('id', upddelid)
        }
    }
    id -= 1
    console.log(id)
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
    $('.new-del-button').click(delOld)
    $('.new-del-button').click(delOld)

    //for wallet
    console.log(window.location)
    addr = window.location.href.split("?")
    $('.wallet-address').text(addr[1])
})
