<template>
    <Loader v-if="loader" />
    <div class="manager-table" v-else>
        <div class="container">
            <h2 class="manager-table__headline">Ім'я менеджера: <span class="manager-table__headline--span">{{manager[0].login}}</span></h2>
            <h3 class="manager-table__sort">Параметри сортування</h3>
            <form class="manager-table__sort-form">
                <input class="manager-table__sort-form--input input" type="text" placeholder="Початкова дата" v-model="startData">
                <input class="manager-table__sort-form--input input" type="text" placeholder="Кінцева дата" v-model="endData">
                <input class="manager-table__sort-form--input input" type="text" placeholder="Ім'я клієнта" v-model="filtrName">
            </form>
            <div class="manager-table__sum">
                Сума: <span class="manager-table__sum--span">{{sumMoney}}</span>
            </div>
            <div class="manager-table__box-head"
                :class="{fixed: fix}"
            >
                <div class="manager-table__item-head">
                    Дата
                </div>
                <div class="manager-table__item-head" v-if="user.role_id == 1">
                    Дата створення оплати
                </div>
                <div class="manager-table__item-head">
                    Ім'я клієнта
                </div>
                <div class="manager-table__item-head">
                    Операція
                </div>
                <div class="manager-table__item-head">
                    Сума готівки
                </div>
                <div class="manager-table__item-head" v-if="user.role_id == 1">
                    Редагувати
                </div>
            </div>
            <div class="manager-table__box-body" v-for="managerMoney in filteredManagerMoney" :key="managerMoney.id">
                <div class="manager-table__item-body">
                    <span class="manager-table__item-body--responsive">Дата: </span>{{managerMoney.data}}
                </div>
                <div class="manager-table__item-body" v-if="user.role_id == 1">
                    <span class="manager-table__item-body--responsive">Дата створення: </span>{{managerMoney.data_create}}
                </div>
                <div class="manager-table__item-body">
                    <router-link :to="{name: 'Clients', params: {id: managerMoney.client_id}}"><span class="manager-table__item-body--responsive">Ім'я клієнта: </span>{{managerMoney.name}}</router-link>
                </div>
                <div class="manager-table__item-body">
                    <span class="manager-table__item-body--responsive">Операція: </span>{{managerMoney.product_name}}
                </div>
                <div class="manager-table__item-body">
                    <span class="manager-table__item-body--responsive">Сума готівки: </span>{{managerMoney.pay_cash}}
                </div>
                <div class="manager-table__item-body edit" v-if="user.role_id == 1" @click.prevent="showModalEdit(managerMoney.id, managerMoney.pay_cash)">
                    Редагувати
                </div>
            </div>
        </div>
        <ModalEditMoneyManager v-if="moneyEdit" 
            :moneyEdit = "moneyEdit"
            :id = "id"
            :pay_cash = "pay_cash"
            @CancelEdit="ChangeModalEdit"
        />
    </div>
</template>

<script>
import ModalEditMoneyManager from '../modals/ModalEditMoneyManager'
import Loader from '../app/Loader'
import axios from 'axios'

export default {
    name: "ManagerMoneyTable",
    data: () => ({
        managerMoneys: [],
        manager: [],
        id: '',
        pay_cash: '',
        startData: '',
        endData: '',
        filtrName: '',
        moneyEdit: false,
        loader: true,
        fix: false
    }),
    mounted() {
        window.document.onscroll = () => {
           if(window.pageYOffset > 255) {
                this.fix = true
            } else {
                this.fix = false
            }
        },
        this.getManagerMoneys()
    },
    methods: {
        async getManagerMoneys() {
            const result = await axios.get(`/api/managermoney/${this.$route.params.id}`, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            this.managerMoneys = result.data.managerMoney.reverse()
            this.manager = result.data.manager
            this.loader = false
        },
        showModalEdit(id, pay_cash) {
           this.moneyEdit = !this.moneyEdit
           this.id = id
           this.pay_cash = pay_cash
        },
        ChangeModalEdit(data) {
            this.moneyEdit = data
            this.getManagerMoneys()
        }
    },
    computed: {
        user() {
            return this.$store.state.auth.newuser.user
        },
        filteredManagerMoney() {
            return this.managerMoneys.filter((money) => {
                if(this.startData != '' && this.endData != '') {
                    return money.data >= this.startData
                    && money.data <= this.endData
                    && money.name.indexOf(this.filtrName) > -1
                } else if(this.endData != '') {
                    return money.data <= this.endData
                    && money.name.indexOf(this.filtrName) > -1 
                } else {
                    return money.data >= this.startData
                    && money.name.indexOf(this.filtrName) > -1 
                }
            })
        },
        sumMoney() {
            return this.filteredManagerMoney.reduce((acc, item) => acc + item.pay_cash, 0);
        },
    },
    components: {
        ModalEditMoneyManager,
        Loader
    }
}
</script>

<style lang="scss" scoped>
    .manager-table {
        margin-top: 30px;
    }
    .manager-table__headline {
        color: #000;
        font-size: 20px;
        font-weight: 700;
    }
    .manager-table__headline--span {
        font-weight: 400;
    }
    .manager-table__sort {
        color: #000;
        font-size: 16px;
        font-weight: 700;
        margin-top: 15px;
    }
    .manager-table__sort-form {
        margin-top: 15px;
        margin-bottom: 30px;
    }
    .manager-table__sort-form--input {
        margin-right: 10px;
        margin-top: 5px;
        &:last-child {
            margin-right: 0px;
        }
    }
    .manager-table__sum {
        border: 1px solid #000;
        padding: 5px;
        color: #000;
        font-size: 16px;
        font-weight: 400;
        width: 100%;
        margin-top: 15px;
    }
    .manager-table__sum--span {
        font-weight: 700;
    }
    .manager-table__box-head {
        display: flex;
        background: #ccc;
    }
    .manager-table__item-head {
        width: 100%;
        border: 1px solid #000;
        font-size: 16px;
        font-weight: 700;
        text-align: center;
        color: #000;
        padding: 5px;
        overflow: hidden;
    }
    .manager-table__box-body {
        display: flex;
        &:hover {
            background: rgba(0,0,0,0.4);
        }
    }
    .manager-table__item-body {
        width: 100%;
        border: 1px solid #000;
        font-size: 16px;
        font-weight: 400;
        padding: 5px;
        overflow: hidden;
    }
    .manager-table__item--check {
        display: block;
        margin: 3px auto;
    }
    .fixed {
        position: fixed;
        top: 0;
        width: 92.2%;
    }
    .manager-table__item-body--responsive {
        font-weight: 700;
        color: #000;
        display: none;
    }
@media screen and (max-width: 1430px) {
    .fixed {
        width: 98.6%;
    }
}
@media screen and (max-width: 600px) {
    .manager-table__box-head {
        display: none;
    }
    .manager-table__box-body {
        display: block;
        margin-bottom: 15px;
    }
    .manager-table__item-body--responsive {
        display: inline-block;
    }
    .manager-table__sort-form--input {
        width: 100%;
    }
}
</style>