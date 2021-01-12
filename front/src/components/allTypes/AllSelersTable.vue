<template>
    <Loader v-if="loader" />
    <div class="selers-table" v-else>
        <div class="container">
            <h2 class="seler-sort__headline">Параметри сортування</h2>
            <form class="seler-sort__form">
                <div class="seler-sort__form--data">
                    <p class="seler-sorm__for--info">За датою</p>
                    <input type="text" class="seler-sort__form--input input" placeholder="Початкова дата" v-model="startData">
                    <input type="text" class="seler-sort__form--input input" placeholder="Кінцева дата" v-model="endData">
                </div>
                <input type="text" class="seler-sort__form--input input" placeholder="За фірмою" v-model="filterFirm">
                <input type="text" class="seler-sort__form--input input" placeholder="За областю" v-model="filterRegion">
                <input type="text" class="seler-sort__form--input input" placeholder="За маркою товару" v-model="filterProductName">
                <input type="text" class="seler-sort__form--input input" placeholder="За номером машини" v-model="filterCarNumber">
            </form>
            <div class="selers-table__general" v-if="user.role_id == 1">
                Сума тон: <span class="selers-table__general--span">{{sumMas}}</span>
            </div>
            <div class="selers-table__general" v-if="user.role_id == 1">
                Сума дельта готівки: <span class="selers-table__general--span">{{sumDeltaCash}}</span>
            </div>
            <div class="selers-table__general" v-if="user.role_id == 1">
                Сума дельта безготівки: <span class="selers-table__general--span">{{sumDeltaCashless}}</span>
            </div>
            <div class="selers-table__box-head"
                :class="{fixed: fix}"
            >
                <div class="selers-table__item-head">
                    №
                </div>
                <div class="selers-table__item-head">
                    № Замовлення
                </div>
                <div class="selers-table__item-head">
                    Номер машини
                </div>
                <div class="selers-table__item-head">
                    Фірма
                </div>
                <div class="selers-table__item-head">
                    Ім'я клієнта
                </div>
                <div class="selers-table__item-head">
                    Дата
                </div>
                <div class="selers-table__item-head">
                    Назва товару
                </div>
                <div class="selers-table__item-head">
                    Оптова ціна
                </div>
                <div class="selers-table__item-head" v-if="user.role_id == 1 || user.role_id == 3">
                    Ціна продажу
                </div>
                <div class="selers-table__item-head" v-if="user.role_id == 1 || user.role_id == 4">
                    Ціна продажу безготівкою
                </div>
                <div class="selers-table__item-head">
                    Кількість
                </div>
                <div class="selers-table__item-head" v-if="user.role_id == 1 || user.role_id == 3">
                    Сума продажу
                </div>
                <div class="selers-table__item-head">
                    Доставка (самовивіз)
                </div>
                <div class="selers-table__item-head">
                    Доставка безготівкою
                </div>
                <div class="selers-table__item-head" v-if="user.role_id == 1">
                    Загальна сума
                </div>
                <div class="selers-table__item-head" v-if="user.role_id == 1">
                    Дельта безготівка
                </div>
                <div class="selers-table__item-head" v-if="user.role_id == 1">
                    Дельта тонни безготівки
                </div>
                <div class="selers-table__item-head" v-if="user.role_id == 1">
                    Дельта готівка
                </div>
                <div class="selers-table__item-head" v-if="user.role_id == 1">
                    Дельта тонни готівка
                </div>
                <div class="selers-table__item-head">
                    Область
                </div>
                <div class="selers-table__item-head" v-if="user.role_id == 1">
                    Створив
                </div>
                <div class="selers-table__item-head" v-if="user.role_id == 1">
                    Видалити
                </div>
            </div>
            <div class="selers-table__box-body" v-for="(allSeler, index) in filteredAllSelers" :key="allSeler.id" :class="{'not-cash': allSeler.price_cash == 0, 'not-cashless': allSeler.price_cash > 0 && allSeler.price_cashless == 0, 'agree-cash': user.role_id == 3 && allSeler.price_cash > 0 || user.role_id == 4 && allSeler.price_cashless > 0 || user.role_id == 1 && allSeler.price_cash > 0 && allSeler.price_cashless > 0 || user.role_id == 5 && allSeler.price_cash > 0 && allSeler.price_cashless > 0, default: allSeler.firm == ''}">
                <div class="selers-table__item-body">
                    <span class="selers-table__item-body--responsive">№: </span>{{index+1}}
                </div>
                <div class="selers-table__item-body">
                    <span class="selers-table__item-body--responsive">Номер замовлення: </span>{{allSeler.order_number}}
                </div>
                <div class="selers-table__item-body">
                    <span class="selers-table__item-body--responsive">Номер машини: </span>{{allSeler.car_number}}
                </div>
                <div class="selers-table__item-body">
                    <span class="selers-table__item-body--responsive">Фірма: </span>{{allSeler.firm}}
                </div>
                <div class="selers-table__item-body">
                    <router-link :to="{name: 'Clients', params: {id: allSeler.client_id}}"><span class="selers-table__item-body--responsive">Ім'я клієнта: </span>{{allSeler.name}}</router-link>
                </div>
                <div class="selers-table__item-body">
                    <span class="selers-table__item-body--responsive">Дата: </span>{{allSeler.data}}
                </div>
                <div class="selers-table__item-body">
                    <span class="selers-table__item-body--responsive">Назва товару: </span>{{allSeler.product_name}}
                </div>
                <div class="selers-table__item-body">
                    <span class="selers-table__item-body--responsive">Оптова ціна: </span>{{allSeler.opt_price}}
                </div>
                <div class="selers-table__item-body" v-if="user.role_id == 1 || user.role_id == 3">
                    <span class="selers-table__item-body--responsive">Ціна продажу готівкою: </span>{{allSeler.price_cash}}
                </div>
                <div class="selers-table__item-body" v-if="user.role_id == 1 || user.role_id == 4">
                    <span class="selers-table__item-body--responsive">Ціна продажу безготівкою: </span>{{allSeler.price_cashless}}
                </div>
                <div class="selers-table__item-body">
                    <span class="selers-table__item-body--responsive">Кількість: </span>{{allSeler.count}}
                </div>
                <div class="selers-table__item-body" v-if="user.role_id == 1 || user.role_id == 3">
                    <span class="selers-table__item-body--responsive">Сума продажу: </span>{{Math.round(allSeler.sumseller)}}
                </div>
                <div class="selers-table__item-body">
                    <span class="selers-table__item-body--responsive">Доставка (самовивіз): </span>{{allSeler.delivery_cash}}
                </div>
                <div class="selers-table__item-body">
                    <span class="selers-table__item-body--responsive">Доставка безготівкою: </span>{{allSeler.delivery_cashless}}
                </div>
                <div class="selers-table__item-body" v-if="user.role_id == 1">
                    <span class="selers-table__item-body--responsive">Загальна сума: </span>{{Math.round(allSeler.general_sum)}}
                </div>
                <div class="selers-table__item-body" v-if="user.role_id == 1">
                    <span class="selers-table__item-body--responsive">Дельта безготівки: </span>{{Math.round(allSeler.delta_cashless)}}
                </div>
                <div class="selers-table__item-body" v-if="user.role_id == 1">
                    <span class="selers-table__item-body--responsive">Дельта тонни безготівки: </span>{{Math.round(allSeler.delta_mas_cashless)}}
                </div>
                <div class="selers-table__item-body" v-if="user.role_id == 1">
                    <span class="selers-table__item-body--responsive">Дельта готівки: </span>{{Math.round(allSeler.delta_cash)}}
                </div>
                <div class="selers-table__item-body" v-if="user.role_id == 1">
                    <span class="selers-table__item-body--responsive">Дельта тонни готівки: </span>{{Math.round(allSeler.delta_mas_cash)}}
                </div>
                <div class="selers-table__item-body">
                    <span class="selers-table__item-body--responsive">Область: </span>{{allSeler.region}}
                </div>
                <div class="selers-table__item-body" v-if="user.role_id == 1">
                    <span class="selers-table__item-body--responsive">Створив: </span>{{allSeler.login}}
                </div>
                <div class="selers-table__item-body delete" v-if="user.role_id == 1" @click.prevent="deleteOrders(allSeler.id)">
                    Видалити
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Loader from '../app/Loader'
import axios from 'axios'

export default {
    name: "AllSelersTable",
    data: () => ({
        allSelers: [],
        startData: '',
        endData: '',
        filterFirm: '',
        filterRegion: '',
        filterProductName: '',
        filterCarNumber: '',
        loader: true,
        fix: false
    }),
    mounted() {
        window.document.onscroll = () => {
           if(window.pageYOffset > 355) {
                this.fix = true
            } else {
                this.fix = false
            }
        },
        this.getAllSelers()
    },
    methods: {
        async getAllSelers() {
            const result = await axios.get(`/api/allselers`, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            this.allSelers = result.data.allSelers.reverse()
            this.loader = false
        },
        async deleteOrders(id) {
            try  {
                const agree = confirm("Ви впевнені, що бажаєте видалити?")
                if(agree) {
                    await axios.delete(`/api/orders/${id}`, {
                        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
                    })
                    this.getAllSelers()
                }
            } catch (e) {
                alert('Відбулася помилка')
            }
        },
    },
    computed: {
        user() {
            return this.$store.state.auth.newuser.user
        },
        filteredAllSelers() {
            return this.allSelers.filter((allSeller) => {
                if(this.startData != '' && this.endData != '') {
                    return allSeller.data >= this.startData
                    && allSeller.data <= this.endData
                    && allSeller.firm.indexOf(this.filterFirm) > -1 
                    && allSeller.region.indexOf(this.filterRegion) > -1 
                    && allSeller.product_name.indexOf(this.filterProductName) > -1 
                    && allSeller.car_number.indexOf(this.filterCarNumber) > -1
                } else if(this.endData != '') {
                    return allSeller.data <= this.endData
                    && allSeller.firm.indexOf(this.filterFirm) > -1 
                    && allSeller.region.indexOf(this.filterRegion) > -1 
                    && allSeller.product_name.indexOf(this.filterProductName) > -1 
                    && allSeller.car_number.indexOf(this.filterCarNumber) > -1
                } else {
                    return allSeller.data >= this.startData
                    && allSeller.firm.indexOf(this.filterFirm) > -1 
                    && allSeller.region.indexOf(this.filterRegion) > -1 
                    && allSeller.product_name.indexOf(this.filterProductName) > -1 
                    && allSeller.car_number.indexOf(this.filterCarNumber) > -1
                }
            })
        },
        sumMas() {
            return this.filteredAllSelers.reduce((acc, item) => acc + item.count, 0);
        },
        sumDeltaCash() {
            return this.filteredAllSelers.reduce((acc, item) => acc + item.delta_cash, 0);
        },
        sumDeltaCashless() {
            return this.filteredAllSelers.reduce((acc, item) => acc + item.delta_cashless, 0);
        }
    },
    components: {
        Loader
    }
}
</script>

<style lang="scss" scoped>
    .selers-table {
        margin: 30px 0px;
    }
    .seler-sort__headline {
        color: #000;
        font-size: 20px;
        font-weight: 700;
    }
    .seler-sort__form {
        margin-bottom: 30px;
    }
    .seler-sort__form--data {
        margin-top: 10px;
    }
    .seler-sorm__for--info {
        margin-bottom: 5px;
    }
    .seler-sort__form--input {
        margin-right: 10px;
        margin-bottom: 10px;
    }
    .seler-sort__form--button {
        display: block;
        border: none;
        background: #00a814;
    }
    .selers-table__general {
        padding: 5px;
        width: 100%;
        border: 1px solid #000;
        color: #000;
        font-size: 16px;
        font-weight: 400;
    }
    .selers-table__general--span {
        font-weight: 700;
    }
    .selers-table__box-head {
        display: flex;
        background: #ccc;
    }
    .selers-table__item-head {
        padding: 5px;
        font-size: 10px;
        font-weight: 700;
        border: 1px solid #000;
        color: #000;
        width: 100%;
        text-align: center;
        overflow: hidden;
    }
    .selers-table__box-body {
        display: flex;
        &:hover {
            background: rgba(0,0,0,0.4);
        }
    }
    .selers-table__item-body {
        padding: 5px;
        font-size: 10px;
        font-weight: 400;
        border: 1px solid #000;
        width: 100%;
        overflow: hidden;
    }
    .selers-table__item-body--check {
        display: block;
        margin: 2px auto;
    }
    .fixed {
        position: fixed;
        top: 0;
        width: 92.2%;
    }
    .selers-table__item-body--responsive {
        font-weight: 700;
        color: #000;
        display: none;
    }
@media screen and (max-width: 1430px) {
    .fixed {
        width: 98.6%;
    }
}
@media screen and (max-width: 900px) {
    .selers-table__box-head {
        display: none;
    }
    .selers-table__box-body {
        display: block;
        margin-bottom: 15px;
    }
    .selers-table__item-body--responsive {
        display: inline-block;
    }
}
@media screen and (max-width: 500px) {
    .seler-sort__form--input {
        width: 100%;
    }
    .seler-sorm__for--info {
        display: none;
    }
}
</style>