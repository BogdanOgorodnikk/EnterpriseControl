<template>
    <Loader v-if="loader" />
    <div class="order-table" v-else>
        <div class="container">
            <router-link v-if="user.role_id == 1 || user.role_id == 5" class="order-table__pith-link" :to="{name: 'Client-pith', params: {id: this.$route.params.id}}">Перейти до залишків клієнта</router-link>
            <div class="order-table__general-info" v-if="user.role_id == 1 || user.role_id == 3">
                Загальний борг: <span class="order-table__general-info--span">{{Math.round(sumMas[0].sumDebt)}}</span>
            </div>
            <div class="order-table__general-info" v-if="user.role_id == 1 || user.role_id == 3">
                Сума залишків: <span class="order-table__general-info--span">{{sumPith[0].sumPith}}</span>
            </div>
            <div class="order-table__general-info" v-if="user.role_id == 1 || user.role_id == 3">
                Сума проданого товару: <span class="order-table__general-info--span">{{sumMas[0].sumDebt - sumPith[0].sumPith}}</span>
            </div>
            <div class="order-table__general-info" v-if="user.role_id == 1 || user.role_id == 3">
                Сума проданих тон: <span class="order-table__general-info--span">{{sumMas[0].sumMas}}</span>
            </div>
            <div class="order-table__box-head"
                :class="{fixed: fix}"
            >
                <div class="order-table__item-head" v-if="user.role_id == 1 || user.role_id == 2 || user.role_id == 3 || user.role_id == 4 || user.role_id == 5">
                    №
                </div>
                <div class="order-table__item-head" v-if="user.role_id == 1 || user.role_id == 2 || user.role_id == 3 || user.role_id == 4">
                    № Замовлення
                </div>
                <div class="order-table__item-head" v-if="user.role_id == 1 || user.role_id == 2 || user.role_id == 3 || user.role_id == 4">
                    Номер машини
                </div>
                <div class="order-table__item-head" v-if="user.role_id == 1 || user.role_id == 2 || user.role_id == 3 || user.role_id == 4">
                    Фірма
                </div>
                <div class="order-table__item-head" v-if="user.role_id == 1 || user.role_id == 2 || user.role_id == 3 || user.role_id == 4 || user.role_id == 5">
                    Дата
                </div>
                <div class="order-table__item-head" v-if="user.role_id == 1">
                    Дата створення
                </div>
                <div class="order-table__item-head" v-if="user.role_id == 1 || user.role_id == 2 || user.role_id == 3 || user.role_id == 4 || user.role_id == 5">
                    Назва товару
                </div>
                <div class="order-table__item-head" v-if="user.role_id == 1 || user.role_id == 2 || user.role_id == 3 || user.role_id == 4">
                    Оптова
                </div>
                <div class="order-table__item-head" v-if="user.role_id == 1 || user.role_id == 3 || user.role_id == 5">
                    Ціна продажу
                </div>
                <div class="order-table__item-head" v-if="user.role_id == 1 || user.role_id == 4">
                    Ціна продажу безготівкою
                </div>
                <div class="order-table__item-head" v-if="user.role_id == 1 || user.role_id == 2 || user.role_id == 3 || user.role_id == 4 || user.role_id == 5">
                    Кількість
                </div>
                <div class="order-table__item-head" v-if="user.role_id == 1 || user.role_id == 3 || user.role_id == 5">
                    Сума продажу
                </div>
                <div class="order-table__item-head" v-if="user.role_id == 1 || user.role_id == 2 || user.role_id == 3 || user.role_id == 4 || user.role_id == 5">
                    Доставка (самовивіз)
                </div>
                <div class="order-table__item-head" v-if="user.role_id == 1 || user.role_id == 2 || user.role_id == 4 || user.role_id == 5">
                    Доставка по безготівкі
                </div>
                <div class="order-table__item-head" v-if="user.role_id == 1 || user.role_id == 5">
                    Загальна сума
                </div>
                <div class="order-table__item-head" v-if="user.role_id == 1 || user.role_id == 3 || user.role_id == 5">
                    Оплата готівка
                </div>
                <div class="order-table__item-head" v-if="user.role_id == 1 || user.role_id == 3 || user.role_id == 4 || user.role_id == 5">
                    Оплата безготівка
                </div>
                <div class="order-table__item-head" v-if="user.role_id == 1">
                    Дельта безготівки
                </div>
                <div class="order-table__item-head" v-if="user.role_id == 1">
                    Дельта тонни безготівкою
                </div>
                <div class="order-table__item-head" v-if="user.role_id == 1">
                    Дельта по готівці
                </div>
                <div class="order-table__item-head" v-if="user.role_id == 1">
                    Дельта тонни по готівці
                </div>
                <div class="order-table__item-head">
                    Область
                </div>
                <div class="order-table__item-head" v-if="user.role_id == 1">
                    Створив
                </div>
                <div class="order-table__item-head" v-if="user.role_id == 1 || user.role_id == 3 || user.role_id == 4">
                    <span v-if="user.role_id == 1">Редагувати</span>
                    <span v-if="user.role_id == 3 || user.role_id == 4">Внести ціну</span>
                </div>
                <div class="order-table__item-head" v-if="user.role_id == 1">
                    Видалити
                </div>
            </div>
            <div class="order-table__box-body" v-for="(order, index) in orders" :key="order.id" :class="{'not-cash': order.price_cash == 0, 'not-cashless': order.price_cash > 0 && order.price_cashless == 0, 'agree-cash': user.role_id == 3 && order.price_cash > 0 || user.role_id == 4 && order.price_cashless > 0 || user.role_id == 1 && order.price_cash > 0 && order.price_cashless > 0 || user.role_id == 5 && order.price_cash > 0 && order.price_cashless > 0, check: order.product_name == 'Перевірка', default: order.firm == ''}">
                <div class="order-table__item-body" v-if="user.role_id == 1 || user.role_id == 2 || user.role_id == 3 || user.role_id == 4 || user.role_id == 5">
                    <span class="order-table__box-body--responsive">№: </span>{{index + 1}}
                </div>
                <div class="order-table__item-body" v-if="user.role_id == 1 || user.role_id == 2 || user.role_id == 3 || user.role_id == 4">
                    <span class="order-table__box-body--responsive">Номер замовлення: </span>{{order.order_number}}
                </div>
                <div class="order-table__item-body" v-if="user.role_id == 1 || user.role_id == 2 || user.role_id == 3 || user.role_id == 4">
                    <span class="order-table__box-body--responsive">Номер машини: </span>{{order.car_number}}
                </div>
                <div class="order-table__item-body" v-if="user.role_id == 1 || user.role_id == 2 || user.role_id == 3 || user.role_id == 4">
                    <span class="order-table__box-body--responsive">Назва фірми: </span>{{order.firm}}
                </div>
                <div class="order-table__item-body" v-if="user.role_id == 1 || user.role_id == 2 || user.role_id == 3 || user.role_id == 4 || user.role_id == 5">
                    <span class="order-table__box-body--responsive">Дата: </span>{{order.data}}
                </div>
                <div class="order-table__item-body" v-if="user.role_id == 1">
                    <span class="order-table__box-body--responsive">Дата створення: </span>{{order.data_create}}
                </div>
                <div class="order-table__item-body" v-if="user.role_id == 1 || user.role_id == 2 || user.role_id == 3 || user.role_id == 4 || user.role_id == 5">
                    <span class="order-table__box-body--responsive">Назва продукта: </span>{{order.product_name}}
                </div>
                <div class="order-table__item-body" v-if="user.role_id == 1 || user.role_id == 2 || user.role_id == 3 || user.role_id == 4">
                    <span class="order-table__box-body--responsive">Оптова ціна: </span>{{order.opt_price}}
                </div>
                <div class="order-table__item-body" v-if="user.role_id == 1 || user.role_id == 3 || user.role_id == 5">
                    <span class="order-table__box-body--responsive">Ціна продажу: </span>{{order.price_cash}}
                </div>
                <div class="order-table__item-body" v-if="user.role_id == 1 || user.role_id == 4">
                    <span class="order-table__box-body--responsive">Ціна продажу безготівкою: </span>{{order.price_cashless}}
                </div>
                <div class="order-table__item-body" v-if="user.role_id == 1 || user.role_id == 2 || user.role_id == 3 || user.role_id == 4 || user.role_id == 5">
                    <span class="order-table__box-body--responsive">Кількість: </span>{{order.count}}
                </div>
                <div class="order-table__item-body" v-if="user.role_id == 1 || user.role_id == 3 || user.role_id == 5">
                    <span class="order-table__box-body--responsive">Сума продажу: </span>{{Math.round(order.sumseller)}}
                </div>
                <div class="order-table__item-body" v-if="user.role_id == 1 || user.role_id == 2 || user.role_id == 3 || user.role_id == 4 || user.role_id == 5"> 
                    <span class="order-table__box-body--responsive">Доставка(самовивіз): </span>{{order.delivery_cash}}
                </div>
                <div class="order-table__item-body" v-if="user.role_id == 1 || user.role_id == 2 || user.role_id == 4 || user.role_id == 5">
                    <span class="order-table__box-body--responsive">Доставка по безготівкі: </span>{{order.delivery_cashless}}
                </div>
                <div class="order-table__item-body" v-if="user.role_id == 1 || user.role_id == 5">
                    <span class="order-table__box-body--responsive">Загальна сума: </span>{{Math.round(order.general_sum)}}
                </div>
                <div class="order-table__item-body" v-if="user.role_id == 1 || user.role_id == 3 || user.role_id == 5">
                    <span class="order-table__box-body--responsive">Оплата готівка: </span>{{order.pay_cash}}
                </div>
                <div class="order-table__item-body" v-if="user.role_id == 1 || user.role_id == 3 || user.role_id == 4 || user.role_id == 5">
                    <span class="order-table__box-body--responsive">Оплата безготівка: </span>{{order.pay_cashless}}
                </div>
                <div class="order-table__item-body" v-if="user.role_id == 1">
                    <span class="order-table__box-body--responsive">Дельта по безготівкі: </span>{{Math.round(order.delta_cashless)}}
                </div>
                <div class="order-table__item-body" v-if="user.role_id == 1">
                    <span class="order-table__box-body--responsive">Дельта тонни безготівки: </span>{{Math.round(order.delta_mas_cashless)}}
                </div>
                <div class="order-table__item-body" v-if="user.role_id == 1">
                    <span class="order-table__box-body--responsive">Дельта по готівці: </span>{{Math.round(order.delta_cash)}}
                </div>
                <div class="order-table__item-body" v-if="user.role_id == 1">
                    <span class="order-table__box-body--responsive">Дельта тонни готівки: </span>{{Math.round(order.delta_mas_cash)}}
                </div>
                <div class="order-table__item-body">
                    <span class="order-table__box-body--responsive">Область: </span>{{order.region}}
                </div>
                <div class="order-table__item-body" v-if="user.role_id == 1">
                    <span class="order-table__box-body--responsive">Створив: </span>{{order.login}}
                </div>
                <div class="order-table__item-body edit" v-if="user.role_id == 1">
                   <span v-if="order.firm != ''" @click.prevent="showModalEdit(order.id, order.order_number, order.car_number, order.firm, order.region, order.data, order.product_name, order.count, order.delivery_cash, order.delivery_cashless, order.price_cash, order.opt_price, order.price_cashless, order.client_id)">Редагувати</span>
                   <span v-else @click.prevent="showModalPayMoney(order.id, order.data, order.product_name, order.pay_cash, order.pay_cashless)">Редагувати</span>
                </div>
                <div class="order-table__item-body edit" v-if="user.role_id == 3">
                   <span v-if="order.price_cash == 0 && order.firm != ''" @click.prevent="showModalPayCash(order.id)">Внести ціну</span>
                   <span v-else-if="order.firm == ''"></span>
                   <span v-else>Ціна внесена</span>
                </div>
                <div class="order-table__item-body edit" v-if="user.role_id == 4">
                   <span v-if="order.price_cashless == 0 && order.price_cash > 0" @click.prevent="showModalPayCashless(order.id)">Внести ціну</span>
                   <span v-else-if="order.price_cash == 0 && order.firm != ''">Не всі є дані</span>
                   <span v-else-if="order.firm == ''"></span>
                   <span v-else>Ціна внесена</span>
                </div>
                <div class="order-table__item-body delete" v-if="user.role_id == 1" @click.prevent="deleteOrders(order.id)">
                    Видалити
                </div>
            </div>
        </div>
        <ModalEditOrder v-if="showEdit" 
            :showEdit = "showEdit"
            :id = "id"
            :order_number = "order_number"
            :car_number = "car_number"
            :firm = "firm"
            :region = "region"
            :data = "data"
            :product_name = "product_name"
            :count = "count"
            :delivery_cash = "delivery_cash"
            :delivery_cashless = "delivery_cashless"
            :price_cash = "price_cash"
            :opt_price = "opt_price"
            :price_cashless = "price_cashless"
            :client_id = "client_id"
            @CancelEdit="ChangeModalEdit"
        />
        <ModalEditCash v-if="showPayCash" 
            :showPayCash = "showPayCash"
            :id = "id"
            @CancelEditCash="ChangeModalPayCash"
        />
        <ModalEditCashless v-if="showPayCashless" 
            :showPayCashless = "showPayCashless"
            :id = "id"
            @CancelEditCashless="ChangeModalPayCashless"
        />
        <ModalEditPayMoney v-if="showPayMoney" 
            :showPayMoney = "showPayMoney"
            :id = "id"
            :data = "data"
            :product_name = "product_name"
            :pay_cash = "pay_cash"
            :pay_cashless = "pay_cashless"
            @CancelEditPayMoney="ChangeModalPayMoney"
        />
    </div>
</template>

<script>
import ModalEditOrder from '../modals/ModalEditOrder'
import ModalEditCash from '../modals/ModalEditCash'
import ModalEditCashless from '../modals/ModalEditCashless'
import ModalEditPayMoney from '../modals/ModalEditPayMoney'
import Loader from '../app/Loader'
import axios from 'axios'
import {busGetOrders} from '../../main'

export default {
    name: "OrderTable",
    data: () => ({
        id: '',
        order_number: '', 
        car_number: '', 
        firm: '', 
        region: '', 
        data: '', 
        product_name: '', 
        count: '', 
        delivery_cash: '', 
        delivery_cashless: '', 
        price_cash: '', 
        opt_price: '', 
        price_cashless: '', 
        client_id: '',
        orders: [],
        client: [],
        town: [],
        sumMas: [],
        sumPith: [],
        showEdit: false,
        showPayCash: false,
        showPayCashless: false,
        showPayMoney: false,
        fix: false,
        loader: true
    }),
    mounted() {
        window.document.onscroll = () => {
           if(window.pageYOffset > 355) {
                this.fix = true
            } else {
                this.fix = false
            }
        },
        this.getOrders()
        this.getSumInfo()
        busGetOrders.$on('getNewOrders', this.getOrders)
        busGetOrders.$on('getSumMas', this.getSumInfo)
        busGetOrders.$on('getNewPayment', this.getOrders)
        busGetOrders.$on('getNewStats', this.getSumInfo)
        busGetOrders.$on('getNewCheck', this.getOrders)
    },
    methods: {
        async getOrders() {
            try {
                const result = await axios.get(`/api/orders/${this.$route.params.id}`, {
                    headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
                })
                this.orders = result.data.order.reverse()
                this.client = result.data.client
                this.town = result.data.town
                this.loader = false
            } catch(e) {
                alert("Відбулася помилка")
            }
        },
        async getSumInfo() {
            try {
                if(this.$store.state.auth.newuser.user.role_id == 1 || this.$store.state.auth.newuser.user.role_id == 3) {
                    const result = await axios.get(`/api/suminfo/${this.$route.params.id}`, {
                        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
                    })
                    this.sumMas = result.data.sumMas
                    this.sumPith = result.data.sumPith
                } else {
                    return false
                }
            } catch(e) {
                alert("Відбулася помилка")
            }
        },
        async deleteOrders(id) {
            try  {
                const agree = confirm("Ви впевнені, що бажаєте видалити?")
                if(agree) {
                    await axios.delete(`/api/orders/${id}`, {
                        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
                    })
                    this.getOrders()
                    this.getSumInfo()
                }
            } catch (e) {
                alert('Відбулася помилка')
            }
        },
        showModalEdit(id, order_number, car_number, firm, region, data, product_name, count, delivery_cash, delivery_cashless, price_cash, opt_price, price_cashless, client_id) {
            this.showEdit = !this.showEdit
            this.id = id
            this.order_number = order_number, 
            this.car_number = car_number, 
            this.firm = firm, 
            this.region = region, 
            this.data = data, 
            this.product_name = product_name, 
            this.count = count, 
            this.delivery_cash = delivery_cash, 
            this.delivery_cashless = delivery_cashless, 
            this.price_cash = price_cash, 
            this.opt_price = opt_price, 
            this.price_cashless = price_cashless, 
            this.client_id = client_id
        },
        showModalPayCash(id) {
            this.showPayCash = !this.showPayCash
            this.id = id
        },
        showModalPayCashless(id) {
            this.showPayCashless = !this.showPayCashless
            this.id = id
        },
        showModalPayMoney(id, data, product_name, pay_cash, pay_cashless) {
            this.showPayMoney = !this.showPayMoney
            this.id = id
            this.data = data
            this.product_name = product_name
            this.pay_cash = pay_cash
            this.pay_cashless = pay_cashless
        },
        ChangeModalEdit(data) {
            this.showEdit = data
            this.getOrders()
            this.getSumInfo()
        },
        ChangeModalPayCash(data) {
            this.showPayCash = data
            this.getOrders()
        },
        ChangeModalPayCashless(data) {
            this.showPayCashless = data
            this.getOrders()
        },
        ChangeModalPayMoney(data) {
            this.showPayMoney = data
            this.getOrders()
            this.getSumInfo()
        }
    },
    computed: {
        user() {
            return this.$store.state.auth.newuser.user
        }
    },
    components: {
        ModalEditOrder,
        ModalEditCash,
        ModalEditCashless,
        ModalEditPayMoney,
        Loader
    }
}
</script>

<style lang="scss" scoped>
    .order-table {
        margin-top: 15px;
        margin-bottom: 30px;
    }
    .order-table__pith-link {
        display: block;
        padding: 5px;
        background: #1dabb8;
        color: #fff;
        font-size: 16px;
        font-weight: 400;
        text-decoration: none;
        max-width: 230px;
        border-radius: 4px;
        margin-top: 10px;
        margin-bottom: 15px;
        &:hover {
            color: #000;
        }
    }
    .order-table__general-info {
        border: 1px solid #000;
        padding: 2px;
        width: 100%;
        color: #000;
        font-size: 16px;
        font-weight: 400;
        &:first-child {
            margin-top: 15px;
        }
    }
    .order-table__general-info--span {
        font-weight: 700;
    }
    .order-table__box-head {
        display: flex;
        background: #ccc;
    }
    .order-table__item-head {
        border: 1px solid #000;
        font-size: 10px;
        color: #000;
        font-weight: 700;
        overflow: hidden;
        width: 400px;
        text-align: center;
        padding: 5px 0px;
    }
    .order-table__box-body {
        display: flex;
        &:hover {
            background: rgba(0,0,0,0.4);
        }
    }
    .order-table__item-body {
        border: 1px solid #000;
        font-size: 10px;
        font-weight: 400;
        overflow: hidden;
        width: 400px;
        padding: 5px 0px;
    }
    .fixed {
        position: fixed;
        top: 0;
        width: 92.2%;
    }
    .order-table__box-body--responsive {
        font-weight: 700;
        color: #000;
        display: none;
    }
@media screen and (max-width: 1430px) {
    .fixed {
        width: 98.6%;
    }
}
@media screen and (max-width: 960px) {
    .order-table__box-head {
        display: none;
    }
    .order-table__box-body {
        display: block;
        margin-bottom: 15px;
    }
    .order-table__item-body {
        width: 100%;
    }
    .order-table__box-body--responsive {
        display: inline-block;
    }
}
</style>