const doSearch = () => {
    // search the wallet
}

$(window).on('load', () => {
    $('.search-input').on('keyup', e => {
        if (e.key === 'Enter' || e.keyCode === 13) doSearch()
    })
    $('.search-button').click(doSearch);
})
