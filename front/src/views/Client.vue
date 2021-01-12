<template>
    <div class="client">
        <CreateOrder />
        <CreateMoney  v-if="user.role_id == 1 || user.role_id == 3 || user.role_id == 4 || user.role_id == 5" />
        <CreateCheck v-if="user.role_id == 1 || user.role_id == 3 || user.role_id == 4 || user.role_id == 5" />
        <OrderTable />
    </div>
</template>

<script>
import CreateOrder from '../components/clients/CreateOrder'
import CreateMoney from '../components/clients/CreateMoney'
import CreateCheck from '../components/clients/CreateCheck'
import OrderTable from '../components/clients/OrderTable'

export default {
    name: "Client",
    components: {
        CreateOrder,
        CreateMoney,
        CreateCheck,
        OrderTable
    },
    computed: {
        user() {
            return this.$store.state.auth.newuser.user
        }
    }
}
</script>