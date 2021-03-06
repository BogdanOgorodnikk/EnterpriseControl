import axios from 'axios'

export default {
    actions: {
        async createPith({commit}, {client_id, data, name, number, price_cash, price_rosdb}) {
            try {
                await axios.post(`/api/pith/${client_id}`,
                {
                    data, 
                    name, 
                    number, 
                    price_cash, 
                    price_rosdb
                },
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async updatePith({commit}, {id, data, name, number, price_cash, price_rosdb}) {
            try {
                await axios.put(`/api/pith/${id}`,
                {
                    data, 
                    name, 
                    number, 
                    price_cash, 
                    price_rosdb
                },
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async updateMathPith({commit}, {id, math}) {
            try {
                await axios.put(`/api/mathpith/${id}`,
                {
                    math
                },
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
            } catch (e) {
                commit('setError', e)
                throw e
            }
        }
    }
}