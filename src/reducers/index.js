
const initialState = {
    menu: [],
    loading: true,
    error: false,
    items: [],
    total: 0
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'MENU_LOADED':
            return {
                ...state,
                menu: action.payload,
                loading: false,
                error: false
            };
        case 'MENU_REQUESTED':
            return {
                ...state,
                menu: state.menu,
                loading: true,
                error: false
            };
        case 'MENU_ERROR':
            return {
                ...state,
                menu: state.menu,
                loading: true,
                error: true,
            };
        case 'ITEM_ADD_TO_CART':
            const id = action.payload;
            const copy = state.items.find(item => item.id === id);
            if (copy) {
                const copyIndex = state.items.findIndex(item => item.id === id)
                const itemCopy = {
                    title: copy.title,
                    price: copy.price,
                    url: copy.url,
                    id: copy.id,
                    count: copy.count + 1
                }
                return {
                    ...state,
                    items: [
                        ...state.items.slice(0, copyIndex),
                        itemCopy,
                        ...state.items.slice(copyIndex + 1)
                    ]
                };
            } else {
                const item = state.menu.find(item => item.id === id);
                const newItem = {
                    title: item.title,
                    price: item.price,
                    url: item.url,
                    id: item.id,
                    count: 1
                };
                return {
                    ...state,
                    items: [
                        ...state.items,
                        newItem
                    ]
                };
            }
            
        case 'ITEM_REMOVE_FROM_CART':
            const idx = action.payload;
            const itemIndex = state.items.findIndex(item => item.id === idx)
            return {
                ...state,
                items: [
                    ...state.items.slice(0, itemIndex),
                    ...state.items.slice(itemIndex + 1)
                ]
            }
        case 'ITEM_MINUS_COUNT_FROM_CART':
            const idm = action.payload;
            const itemIndexMinus = state.items.findIndex(item => item.id === idm);
            const copyMinus = state.items.find(item => item.id === idm);
            const itemMinusOne = {
                title: copyMinus.title,
                price: copyMinus.price,
                url: copyMinus.url,
                id: copyMinus.id,
                count: copyMinus.count - 1
            }
            return {
                ...state,
                items: [
                    ...state.items.slice(0, itemIndexMinus),
                    itemMinusOne,
                    ...state.items.slice(itemIndexMinus + 1)
                ]
            };
        case 'ITEM_PLUS_COUNT_FROM_CART':
            const idp = action.payload;
            const itemIndexPlus = state.items.findIndex(item => item.id === idp);
            const copyPlus = state.items.find(item => item.id === idp);
            const itemPlusOne = {
                title: copyPlus.title,
                price: copyPlus.price,
                url: copyPlus.url,
                id: copyPlus.id,
                count: copyPlus.count + 1
            }
            return {
                ...state,
                items: [
                    ...state.items.slice(0, itemIndexPlus),
                    itemPlusOne,
                    ...state.items.slice(itemIndexPlus + 1)
                ]
            };
        case 'TOTAL_CASH': 
            let totalCash = 0;
            if (state.items) {
                state.items.map(item => {
                    totalCash += item.price * item.count;
                })
            }
            return {
                ...state,
                total: totalCash
            }
        default: 
            return state;
    }
}

export default reducer;