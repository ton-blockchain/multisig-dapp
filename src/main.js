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

}

$(window).on('load', () => {
    //for index
    $('.search-input').on('keyup', e => {
        if (e.key === 'Enter' || e.keyCode === 13) doSearch()
    })
    $('.search-button').click(doSearch);
    $('#new').click(goNew);

    //for wallet
    console.log(window.location)
    addr = window.location.href.split("?")
    $('.wallet-address').text(addr[1])

})
