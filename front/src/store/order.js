import axios from 'axios'

export default {
    actions: {
        async createOrder({commit}, {client_id, order_number, car_number, firm, region, data, product_name, opt_price, count, delivery_cash, delivery_cashless}) {
            try {
                await axios.post(`/api/orders/${client_id}`,
                {
                    order_number, 
                    car_number, 
                    firm, 
                    region,
                    data, 
                    product_name, 
                    opt_price, 
                    count, 
                    delivery_cash, 
                    delivery_cashless
                },
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async createMoneyPay({commit}, {client_id, data, product_name, pay_cash, pay_cashless}) {
            try {
                await axios.post(`/api/paymoney/${client_id}`,
                {
                    data,
                    product_name,
                    pay_cash,
                    pay_cashless 
                },
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async createCheck({commit}, {client_id, data, pay_cash}) {
            try {
                await axios.post(`/api/checkmoney/${client_id}`,
                {
                    data,
                    pay_cash
                },
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async updateOrderPriceCash({commit}, {id, price_cash}) {
            try {
                await axios.put(`/api/pricecash/${id}`,
                {
                    price_cash
                },
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async updateOrderPriceCashless({commit}, {id, price_cashless}) {
            try {
                await axios.put(`/api/pricecashless/${id}`,
                {
                    price_cashless
                },
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async updateOrder({commit}, {id, order_number, car_number, firm, region, data, product_name, count, delivery_cash, delivery_cashless, price_cash, opt_price, price_cashless, client_id}) {
            try {
                await axios.put(`/api/editorder/${id}`,
                {
                    order_number: order_number, 
                    car_number: car_number, 
                    firm: firm, 
                    region: region, 
                    data: data, 
                    product_name: product_name, 
                    count: count, 
                    delivery_cash: delivery_cash, 
                    delivery_cashless: delivery_cashless, 
                    price_cash: price_cash, 
                    opt_price: opt_price, 
                    price_cashless: price_cashless, 
                    client_id: client_id
                },
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async updatePayMoney({commit}, {id, data, product_name, pay_cash, pay_cashless}) {
            try {
                await axios.put(`/api/editpaymoney/${id}`,
                { 
                    data: data, 
                    product_name: product_name, 
                    pay_cash: pay_cash, 
                    pay_cashless: pay_cashless, 
                },
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async updateManagerMoney({commit}, {id, pay_cash}) {
            try {
                await axios.put(`/api/managermoneyedit/${id}`,
                { 
                    pay_cash: pay_cash
                },
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
            } catch (e) {
                commit('setError', e)
                throw e
            }
        }
    }
}