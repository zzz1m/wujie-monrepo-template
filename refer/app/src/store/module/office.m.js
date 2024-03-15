
export default {
    name: 'office',
    namespaced: true,
    state: {
        cartList: []
    },
    mutations: {
        addCart (state, payload) {
            state.cartList.push(payload);
            return;
            let temp = state.cartList.find(v => v.id === payload.id);
            if (temp) {
                temp.count++;
            } else {
                state.cartList.push(payload);
            }
        },
        setCart (state, payload) {
            state.cartList = payload;
        }
    }
};