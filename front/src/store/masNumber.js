import axios from 'axios'

export default {
    actions: {
        async createMasNumber({commit}, {number}) {
            try {
                await axios.post(`/api/masnumber`,
                {
                    number
                },
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async updateMasNumber({commit}, {id, number}) {
            try {
                await axios.put(`/api/masnumber/${id}`,
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