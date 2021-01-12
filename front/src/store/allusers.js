import axios from 'axios'

export default {
    actions: {
        async updateUser({commit}, {id, role_id, ban}) {
            try {
                await axios.put(`/api/allusers/${id}`,
                {
                    role_id,
                    ban
                },
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async updateUserLoginandPass({commit}, {id, login, password}) {
            try {
                await axios.put(`/api/allusers/edit/${id}`,
                {
                    login, 
                    password
                },
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
            } catch (e) {
                commit('setError', e)
                throw e
            }
        }
    }
}