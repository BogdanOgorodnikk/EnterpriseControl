import axios from 'axios'

export default {
    actions: {
        async createProductName({commit}, {name}) {
            try {
                await axios.post(`/api/productname`,
                {
                    name
                },
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async updateProductName({commit}, {id, name}) {
            try {
                await axios.put(`/api/productname/${id}`,
                {
                    name
                },
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
            } catch (e) {
                commit('setError', e)
                throw e
            }
        }
    }
}