<template>
    <div class="modal-create">
        <div class="opinion" @click.self="RemoveModal"></div>
        <div class="modal-create__box">
            <h2 class="modal-create__headline">Редагування внесених оплат</h2>
            <form class="modal-create__form" @submit.prevent="changePayMoney">
                <p class="modal-create__form--text">Введіть нову дату в полі нижче</p>
                <input type="text" class="modal-create__form--input input" placeholder="Дата" v-model="data"
                    :class="{invalid: ($v.data.$dirty && !$v.data.required)}"
                >
                <p class="modal-create__form--text">Введіть нову назву продукта в полі нижче</p>
                <input type="text" class="modal-create__form--input input" placeholder="Назва продукта" v-model="product_name"
                    :class="{invalid: ($v.product_name.$dirty && !$v.product_name.required)}"
                >
                <p class="modal-create__form--text">Введіть сплачену готівку в полі нижче</p>
                <input type="text" class="modal-create__form--input input" placeholder="Сплачено готівки" v-model="pay_cash"
                    :class="{invalid: ($v.pay_cash.$dirty && !$v.pay_cash.required)}"
                >
                <p class="modal-create__form--text">Введіть сплачену безготівку в полі нижче</p>
                <input type="text" class="modal-create__form--input input" placeholder="Сплачено безготівки" v-model="pay_cashless"
                    :class="{invalid: ($v.pay_cashless.$dirty && !$v.pay_cashless.required)}"
                >
                <div class="modal-create__form--block">
                    <input type="submit" class="modal-create__form--button button" value="Змінити">
                    <button @click.prevent="RemoveModal" class="modal-create__form--button button">Відмінити</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import {required} from 'vuelidate/lib/validators'

export default {
    name: "ModalEditProductCreate",
    props: ['showPayMoney', 'id', 'data', 'product_name', 'pay_cash', 'pay_cashless'],
    validations: {
        data: {required},
        product_name: {required},
        pay_cash: {required},
        pay_cashless: {required}
    },
    methods: {
        async changePayMoney() {
            if(this.$v.$invalid) {
                this.$v.$touch()
                return
            }
            const formData = {
                id: this.id, 
                data: this.data, 
                product_name: this.product_name,
                pay_cash: this.pay_cash,
                pay_cashless: this.pay_cashless,
            }
            try  {
                await this.$store.dispatch('updatePayMoney', formData)
                this.RemoveModal()
            } catch (e) {
                alert('Відбулася помилка')
            }
        },
        RemoveModal() {
            this.showPayMoney = !this.showPayMoney
            this.$emit('CancelEditPayMoney', this.showPayMoney)
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
    .modal-create__box {
        background: #fff;
        max-width: 500px;
        width: 100%;
        height: 330px;
        position: fixed;
        left: 34%;
        top: 20%;
        border-radius: 8px;
    }
    .modal-create__headline {
        text-align: center;
        margin-top: 10px;
        font-size: 20px;
        font-weight: 700;
    }
    .modal-create__form {
        margin-left: 10px;
        margin-top: 10px;
    }
    .modal-create__form--text {
        font-size: 16px;
        font-weight: 400;
        margin-bottom: 5px;
    }
    .modal-create__form--block {
        display: flex;
        margin-top: 26px;
    }
    .modal-create__form--button {
        display: block;
        margin: 0 auto;
        width: 40%;
        background: #00a814;
        border: none;
        &:last-child {
            background: #e51f1f;
        }
    }
    .modal-create__form--input {
        width: 98%;
    }
@media screen and (max-width: 1000px) {
    .modal-create__box {
        left: 20%;
    }
}
@media screen and (max-width: 638px) {
    .modal-create__box {
        left: 0%;
    }
}
@media screen and (max-width: 324px) {
    .modal-create__box {
        height: 360px;
    }
}
@media screen and (max-width: 297px) {
    .modal-create__box {
        height: 390px;
    }
}
@media screen and (max-width: 274px) {
    .modal-create__box {
        height: 430px;
    }
}
</style>