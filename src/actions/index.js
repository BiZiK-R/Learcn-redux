const menuLoaded = (newMenu) => {
    return {
        type: 'MENU_LOADED',
        payload: newMenu
    }
}

const menuRequested = () => {
    return {
        type: 'MENU_REQUESTED',
    }
}

const menuError = () => {
    return {
        type: 'MENU_ERROR',
    }
}

const addedToCard = (id) => {
    return {
        type: 'ITEM_ADD_TO_CART',
        payload: id
    }
}

const deleteFromCard = (id) => {
    return {
        type: 'ITEM_REMOVE_FROM_CART',
        payload: id
    }
}

const minusCountFromCard = (id) => {
    return {
        type: 'ITEM_MINUS_COUNT_FROM_CART',
        payload: id
    }
}

const plusCountFromCard = (id) => {
    
    return {
        type: 'ITEM_PLUS_COUNT_FROM_CART',
        payload: id
    }
}

const getTotalCash = () => {
    return {
        type: 'TOTAL_CASH',
    }
}

export {
    menuLoaded,
    menuRequested,
    menuError,
    addedToCard,
    deleteFromCard,
    minusCountFromCard,
    plusCountFromCard,
    getTotalCash
};