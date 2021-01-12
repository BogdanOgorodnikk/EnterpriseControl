import axios from 'axios'

export default {
    actions: {
        async updateTown({commit}, {id, name}) {
            try {
                await axios.put(`/api/town/${id}`,
                {
                    name
                },
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async updateTownManagers({commit}, {id, manager_id, safemanager_id, securitymanager_id}) {
            try {
                await axios.put(`/api/town/manager/${id}`,
                {
                    manager_id, 
                    safemanager_id, 
                    securitymanager_id
                },
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async createTown({commit}, {name}) {
            try {
                await axios.post(`/api/town`,
                {
                    name
                },
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
    }
}