<template>
    <Loader v-if="loader" />
    <div class="debt-table" v-else>
        <div class="container">
            <div class="debt-table__general">
                Сума боргів: <span class="debt-table__general--span">{{sumDebt}}</span>
            </div>
            <div class="debt-table__general">
                Сума залишків клієнтів: <span class="debt-table__general--span">{{sumPithDebt}}</span>
            </div>
            <div class="debt-table__general">
                Сума проданого товару: <span class="debt-table__general--span">{{sumDebt - sumPithDebt}}</span>
            </div>
            <div class="debt-table__box-head"
                :class="{fixed: fix}"
            >
                <div class="debt-table__item-head">
                    Ім'я клієнта
                </div>
                <div class="debt-table__item-head">
                    Борг клієнта
                </div>
                <div class="debt-table__item-head">
                    Сума залишків клієнта
                </div>
                <div class="debt-table__item-head">
                    Сума проданого товару
                </div>
            </div>
            <div class="debt-table__box-body" v-for="debt in debts" :key="debt.client_id">
                <div class="debt-table__item-body">
                    <router-link :to="{name: 'Clients', params: {id: debt.client_id}}"><span class="debt-table__item-body--responsive">Ім'я клієнта: </span>{{debt.name}}</router-link>
                </div>
                <div class="debt-table__item-body">
                    <span class="debt-table__item-body--responsive">Борг клієнта: </span>{{Math.round(debt.sumDebt)}}
                </div>
                <div class="debt-table__item-body">
                    <span class="debt-table__item-body--responsive">Сума залишків клієнта: </span>{{Math.round(debt.sumPithDebt)}}
                </div>
                <div class="debt-table__item-body">
                    <span class="debt-table__item-body--responsive">Сума проданого товару: </span>{{Math.round(debt.sumSeller)}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Loader from '../app/Loader'
import axios from 'axios'

export default {
    name: "DebtTable",
    data: () => ({
        debts: [],
        pithDebts: [],
        sumDebt: 0,
        sumPithDebt: 0,
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
        this.getDebts()
    },
    methods: {
        async getDebts() {
            const result = await axios.get(`/api/alldebts`, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            this.debts = result.data.debts.reverse()
            this.pithDebts = result.data.pithDebts.reverse()
            console.log(this.pithDebts)
            this.debts.forEach(element => {
                this.pithDebts.forEach(item => {
                    element.sumPithDebt = 0
                    if(element.client_id == item.client_id) {
                        element.sumPithDebt = item.sumPith
                        this.sumPithDebt += +item.sumPith
                    }
                });
                this.sumDebt += +element.sumDebt
                element.sumSeller = element.sumDebt - element.sumPithDebt || 0
            }); 
            this.loader = false
        },
    },
    components: {
        Loader
    }
}
</script>

<style lang="scss" scoped>
    .debt-table {
        margin: 30px 0px;
    }
    .debt-table__general {
        border: 1px solid #000;
        width: 100%;
        color: #000;
        font-weight: 400;
        font-size: 16px;
        padding: 5px;
    }
    .debt-table__general--span {
        font-weight: 700;
    }
    .debt-table__box-head {
        display: flex;
        background: #ccc;
    }
    .debt-table__item-head {
        border: 1px solid #000;
        width: 100%;
        color: #000;
        font-weight: 700;
        font-size: 16px;
        padding: 5px;
        text-align: center;
    }
    .debt-table__box-body {
        display: flex;
        &:hover {
            background: rgba(0,0,0,0.4);
        }
    }
    .debt-table__item-body {
        border: 1px solid #000;
        width: 100%;
        font-weight: 400;
        font-size: 16px;
        padding: 5px;
    }
    .fixed {
        position: fixed;
        top: 0;
        width: 92.2%;
    }
    .debt-table__item-body--responsive {
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
    .debt-table__box-head {
        display: none;
    }
    .debt-table__box-body {
        display: block;
        margin-bottom: 15px;
    }
    .debt-table__item-body--responsive {
        display: inline-block;
    }
}
</style>