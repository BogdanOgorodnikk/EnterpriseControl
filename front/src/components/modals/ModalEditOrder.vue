<template>
    <div class="modal-order">
        <div class="opinion" @click.self="RemoveModal"></div>
        <div class="modal-order__box">
            <h2 class="modal-order__headline">Редагування замовлення</h2>
            <form class="modal-order__form" @submit.prevent="changeOrder">
                <div class="modal-order__form--info-block">
                    <label class="modal-order__form--text">Номер замовлення</label>
                    <input type="text" class="modal-order__form--input input" placeholder="Номер замовлення" v-model="order_number"
                        :class="{invalid: ($v.order_number.$dirty && !$v.order_number.required)}"
                    >
                </div>
                <div class="modal-order__form--info-block">
                    <label class="modal-order__form--text">Номер машини</label>
                    <input type="text" class="modal-order__form--input input" placeholder="Номер машини" v-model="car_number"
                        :class="{invalid: ($v.car_number.$dirty && !$v.car_number.required)}"
                    >
                </div>
                <div class="modal-order__form--info-block">
                    <label class="modal-order__form--text">Назва фірми</label>
                    <input type="text" class="modal-order__form--input input" placeholder="Назва фірми" v-model="firm"
                        :class="{invalid: ($v.firm.$dirty && !$v.firm.required)}"
                    >
                </div>
                <div class="modal-order__form--info-block">
                    <label class="modal-order__form--text">Область</label>
                    <input type="text" class="modal-order__form--input input" placeholder="Область" v-model="region"
                        :class="{invalid: ($v.region.$dirty && !$v.region.required)}"
                    >
                </div>
                <div class="modal-order__form--info-block">
                    <label class="modal-order__form--text">Дата</label>
                    <input type="text" class="modal-order__form--input input" placeholder="Дата" v-model="data"
                        :class="{invalid: ($v.data.$dirty && !$v.data.required)}"
                    >
                </div>
                <div class="modal-order__form--info-block">
                    <label class="modal-order__form--text">Назва товару</label>
                    <input type="text" class="modal-order__form--input input" placeholder="Назва товару" v-model="product_name"
                        :class="{invalid: ($v.product_name.$dirty && !$v.product_name.required)}"
                    >
                </div>
                <div class="modal-order__form--info-block">
                    <label class="modal-order__form--text">Кількість</label>
                    <input type="text" class="modal-order__form--input input" placeholder="Кількість" v-model="count"
                        :class="{invalid: ($v.count.$dirty && !$v.count.required)}"
                    >
                </div>
                <div class="modal-order__form--info-block">
                    <label class="modal-order__form--text">Доставка(самовивіз)</label>
                    <input type="text" class="modal-order__form--input input" placeholder="Доставка" v-model="delivery_cash"
                        :class="{invalid: ($v.delivery_cash.$dirty && !$v.delivery_cash.required)}"
                    >
                </div>
                <div class="modal-order__form--info-block">
                    <label class="modal-order__form--text">Доставка безготівка</label>
                    <input type="text" class="modal-order__form--input input" placeholder="Доставка безготівка" v-model="delivery_cashless"
                        :class="{invalid: ($v.delivery_cashless.$dirty && !$v.delivery_cashless.required)}"
                    >
                </div>
                <div class="modal-order__form--info-block">
                    <label class="modal-order__form--text">Ціна готівкою</label>
                    <input type="text" class="modal-order__form--input input" placeholder="Ціна" v-model="price_cash"
                        :class="{invalid: ($v.price_cash.$dirty && !$v.price_cash.required)}"
                    >
                </div>
                <div class="modal-order__form--info-block">
                    <label class="modal-order__form--text">Оптова ціна</label>
                    <input type="text" class="modal-order__form--input input" placeholder="Оптова ціна" v-model="opt_price"
                        :class="{invalid: ($v.opt_price.$dirty && !$v.opt_price.required)}"
                    >
                </div>
                <div class="modal-order__form--info-block">
                    <label class="modal-order__form--text">Ціна продажу безготівкою</label>
                    <input type="text" class="modal-order__form--input input" placeholder="Ціна продажу безготівкою" v-model="price_cashless"
                        :class="{invalid: ($v.price_cashless.$dirty && !$v.price_cashless.required)}"
                    >
                </div>
                <div class="modal-order__form--info-block">
                    <label class="modal-order__form--text">Змінити власника замовлення</label>
                    <select class="modal-order__form--select" v-model="client_id">
                        <option v-for="client in clients" :key="client.id" :value="client.id">{{client.name}}</option>
                    </select>
                </div>
                <div class="modal-order__form--block">
                    <input type="submit" class="modal-order__form--button button" value="Змінити">
                    <button @click.prevent="RemoveModal" class="modal-order__form--button button">Відмінити</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import {required} from 'vuelidate/lib/validators'
import axios from 'axios'

export default {
    name: "ModalEditOrder",
    props: ['showEdit', 'id', 'order_number', 'car_number', 'firm', 'region', 'data', 'product_name', 'count', 'delivery_cash', 'delivery_cashless', 'price_cash', 'opt_price', 'price_cashless', 'client_id'],
    data: () => ({
        clients: []
    }),
    validations: {
        order_number: {required},
        car_number: {required},
        firm: {required},
        region: {required},
        data: {required},
        product_name: {required},
        count: {required},
        delivery_cash: {required},
        delivery_cashless: {required},
        price_cash: {required},
        opt_price: {required},
        price_cashless: {required}
    },
    mounted() {
        this.getClients()
    },
    methods: {
        async getClients() {
            try {
                const result = await axios.get(`/api/allclients`, {
                    headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
                })
                this.clients = result.data.clients
            } catch(e) {
                alert("Відбулася помилка")
            }
        },
        async changeOrder() {
            if(this.$v.$invalid) {
                this.$v.$touch()
                return
            }
            const formData = {
                id: this.id, 
                order_number: this.order_number, 
                car_number: this.car_number, 
                firm: this.firm, 
                region: this.region, 
                data: this.data, 
                product_name: this.product_name, 
                count: this.count, 
                delivery_cash: this.delivery_cash, 
                delivery_cashless: this.delivery_cashless, 
                price_cash: this.price_cash, 
                opt_price: this.opt_price, 
                price_cashless: this.price_cashless, 
                client_id: this.client_id
            }
            try  {
                await this.$store.dispatch('updateOrder', formData)
                this.RemoveModal()
            } catch (e) {
                alert('Відбулася помилка')
            }
        },
        RemoveModal() {
            this.showEdit = !this.showEdit
            this.$emit('CancelEdit', this.showEdit)
        }
    }
}
</script>

<style lang="scss" scoped>
    .opinion {
        background: rgba(0,0,0, 0.5);
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
    }
    .modal-order__box {
        background: #fff;
        max-width: 500px;
        width: 100%;
        height: 590px;
        position: fixed;
        left: 34%;
        top: 4%;
        border-radius: 8px;
    }
    .modal-order__headline {
        text-align: center;
        margin-top: 10px;
        font-size: 20px;
        font-weight: 700;
    }
    .modal-order__form {
        margin-left: 10px;
        margin-top: 10px;
    }
    .modal-order__form--text {
        font-size: 16px;
        font-weight: 400;
        margin-right: 5px;
    }
    .modal-order__form--block {
        display: flex;
        margin-top: 26px;
    }
    .modal-order__form--button {
        display: block;
        margin: 0 auto;
        width: 40%;
        background: #00a814;
        border: none;
        &:last-child {
            background: #e51f1f;
        }
    }
    .modal-order__form--input {
        width: 54%;
        margin-right: 10px;
    }
    .modal-order__form--info-block {
        margin-bottom: 5px;
        display: flex;
        justify-content: space-between;
    }
    .modal-order__form--select {
        border: 1px solid #000;
        padding: 5px;
        border-radius: 4px;
        color: #000;
        font-size: 16px;
        font-weight: 400;
        width: 48%;
        margin-right: 10px;
    }
@media screen and (max-width: 1000px) {
    .modal-order__box {
        left: 20%;
    }
}
@media screen and (max-width: 638px) {
    .modal-order__box {
        left: 0%;
    }
}
@media screen and (max-width: 288px) {
    .modal-order__box {
        height: 640px;
    }
}
</style>