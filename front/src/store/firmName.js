import axios from 'axios'

export default {
    actions: {
        async createFirmName({commit}, {name}) {
            try {
                await axios.post(`/api/firmname`,
                {
                    name
                },
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async updateFirmName({commit}, {id, name}) {
            try {
                await axios.put(`/api/firmname/${id}`,
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