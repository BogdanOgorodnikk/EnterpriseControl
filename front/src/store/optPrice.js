import axios from 'axios'

export default {
    actions: {
        async createOptPrice({commit}, {number}) {
            try {
                await axios.post(`/api/optprice`,
                {
                    number
                },
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async updateOptPrice({commit}, {id, number}) {
            try {
                await axios.put(`/api/optprice/${id}`,
                {
                    number
                },
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
            } catch (e) {
                commit('setError', e)
                throw e
            }
        }
    }
}