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
    let pkph = 'Public key ' + id
    let pkid = 'pubkey_' + id
    $('.new-main-wrapper')[0].insertAdjacentHTML('beforeend', '<input type="text" class="new-input" value="">')
    $('.new-input')[id-1].setAttribute('placeholder', pkph)
    $('.new-input')[id-1].setAttribute('id', pkid)
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

    //for wallet
    console.log(window.location)
    addr = window.location.href.split("?")
    $('.wallet-address').text(addr[1])
})
