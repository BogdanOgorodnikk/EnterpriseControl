<template>
    <Loader v-if="loader" />
    <div class="cash-table" v-else>
        <div class="container">
            <h3 class="money__sort">Параметри сортування</h3>
            <form class="money__sort-form">
                <input class="money__sort-form--input input" type="text" placeholder="Початкова дата" v-model="startData">
                <input class="money__sort-form--input input" type="text" placeholder="Кінцева дата" v-model="endData">
                <input class="money__sort-form--input input" type="text" placeholder="Ім'я працівника" v-model="filtrCreaterName">
                <input class="money__sort-form--input input" type="text" placeholder="Ім'я клієнта" v-model="filtrClientName">
            </form>
            <div class="cash-table__sum">
                Сума: <span class="cash-table__sum--span">{{sumMoney}}</span>
            </div>
            <div class="cash-table__box-head"
                :class="{fixed: fix}"
            >
                <div class="cash-table__item-head">
                    №
                </div>
                <div class="cash-table__item-head">
                    Дата
                </div>
                <div class="cash-table__item-head">
                    Ім'я працівника
                </div>
                <div class="cash-table__item-head">
                    Ім'я клієнта
                </div>
                <div class="cash-table__item-head">
                    Дія
                </div>
                <div class="cash-table__item-head">
                    Сума
                </div>
            </div>
            <div class="cash-table__box-body" v-for="(cash, index) in filteredCash" :key="cash.id">
                <div class="cash-table__item-body">
                    <span class="cash-table__item-body--responsive">№: </span>{{index + 1}}
                </div>
                <div class="cash-table__item-body">
                    <span class="cash-table__item-body--responsive">Дата: </span>{{cash.data}}
                </div>
                <div class="cash-table__item-body">
                    <span class="cash-table__item-body--responsive">Ім'я працівника: </span>{{cash.login}}
                </div>
                <div class="cash-table__item-body">
                    <router-link :to="{name: 'Clients', params: {id: cash.client_id}}"><span class="cash-table__item-body--responsive">Ім'я клієнта: </span>{{cash.name}}</router-link>
                </div>
                <div class="cash-table__item-body">
                    <span class="cash-table__item-body--responsive">Дія: </span>{{cash.product_name}}
                </div>
                <div class="cash-table__item-body">
                    <span class="cash-table__item-body--responsive">Сума: </span>{{cash.pay_cash}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Loader from '../app/Loader'
import axios from 'axios'

export default {
    name: "CashTable",
    data: () => ({
        cashs: [],
        startData: '',
        endData: '',
        filtrCreaterName: '',
        filtrClientName: '',
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
        this.getCashs()
    },
    methods: {
        async getCashs() {
            const result = await axios.get(`/api/cashmoney`, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            this.cashs = result.data.cashmoneys.reverse()
            this.loader = false
        },
    },
    computed: {
        filteredCash() {
            return this.cashs.filter((money) => {
                if(this.startData != '' && this.endData != '') {
                    return money.data >= this.startData
                    && money.data <= this.endData
                    && money.login.indexOf(this.filtrCreaterName) > -1
                    && money.name.indexOf(this.filtrClientName) > -1
                } else if(this.endData != '') {
                    return money.data <= this.endData
                    && money.login.indexOf(this.filtrCreaterName) > -1
                    && money.name.indexOf(this.filtrClientName) > -1
                } else {
                    return money.data >= this.startData
                    && money.login.indexOf(this.filtrCreaterName) > -1
                    && money.name.indexOf(this.filtrClientName) > -1
                }
            })
        },
        sumMoney() {
            return this.filteredCash.reduce((acc, item) => acc + item.pay_cash, 0);
        },
    },
    components: {
        Loader
    }
}
</script>

<style lang="scss" scoped>
    .cash-table {
        margin: 30px 0px;
    }
    .money__sort {
        color: #000;
        font-size: 16px;
        font-weight: 700;
        margin-top: 15px;
    }
    .money__sort-form {
        margin-top: 15px;
        margin-bottom: 30px;
    }
    .money__sort-form--input {
        margin-right: 10px;
        margin-top: 5px;
        &:last-child {
            margin-right: 0px;
        }
    }
    .cash-table__sum {
        padding: 5px;
        border: 1px solid #000;
        font-size: 16px;
        font-weight: 400;
        color: #000;
        width: 100%;
    }
    .cash-table__sum--span {
        font-weight: 700;
    }
    .cash-table__box-head {
        display: flex;
        background: #ccc;
    }
    .cash-table__item-head {
        padding: 5px;
        border: 1px solid #000;
        font-size: 16px;
        font-weight: 700;
        color: #000;
        width: 100%;
        text-align: center;
        overflow: hidden;
    }
    .cash-table__box-body {
        display: flex;
        &:hover {
            background: rgba(0,0,0,0.4);
        }
    }
    .cash-table__item-body {
        padding: 5px;
        border: 1px solid #000;
        font-size: 16px;
        font-weight: 400;
        width: 100%;
        overflow: hidden;
    }
    .cash-table__item-body--check {
        display: block;
        margin: 3px auto;
    }
    .fixed {
        position: fixed;
        top: 0;
        width: 92.2%;
    }
    .cash-table__item-body--responsive {
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
    .cash-table__box-head {
        display: none;
    }
    .cash-table__box-body {
        display: block;
        margin-bottom: 15px;
    }
    .cash-table__item-body--responsive {
        display: inline-block;
    }
}
</style>