<template>
    <div class="modal-town">
        <div class="opinion" @click.self="RemoveModal"></div>
        <div class="modal-town__box">
            <h2 class="modal-town__headline">Редагування назви міста</h2>
            <form class="modal-town__form" @submit.prevent="changeTown">
                <p class="modal-town__form--text">Введіть нову назву міста в полі нижче</p>
                <input type="text" class="modal-town__form--input input" placeholder="Назва міста" v-model="name"
                    :class="{invalid: ($v.name.$dirty && !$v.name.required) || ($v.name.$dirty && !$v.name.minLength)}"
                >
                <small 
                    class="helper-text__invalid"
                    v-if="$v.name.$dirty && !$v.name.required"
                >Поле назви міста не повинно бути пустим!</small>
                <small class="helper-text__invalid"
                    v-else-if="$v.name.$dirty && !$v.name.minLength"
                >Мінімальна довжина назви міста {{$v.name.$params.minLength.min}} штук! Зараз він: {{name.length}}</small>
                <div class="modal-town__form--block">
                    <input type="submit" class="modal-town__form--button button" value="Змінити">
                    <button @click.prevent="RemoveModal" class="modal-town__form--button button">Відмінити</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import {required, minLength} from 'vuelidate/lib/validators'

export default {
    name: "ModalEditTown",
    props: ['showModalEditTown', 'id', 'name'],
    validations: {
        name: {required, minLength: minLength(2)},
    },
    methods: {
        async changeTown() {
            if(this.$v.$invalid) {
                this.$v.$touch()
                return
            }
            const formData = {
                id: this.id, 
                name: this.name
            }
            try  {
                await this.$store.dispatch('updateTown', formData)
                this.RemoveModal()
            } catch (e) {
                alert('Відбулася помилка')
            }
        },
        RemoveModal() {
            this.showModalEditTown = !this.showModalEditTown
            this.$emit('CancelEdit', this.showModalEditTown)
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
    .modal-town__box {
        background: #fff;
        width: 100%;
        max-width: 500px;
        height: 190px;
        position: fixed;
        left: 34%;
        top: 20%;
        border-radius: 8px;
    }
    .modal-town__headline {
        text-align: center;
        margin-top: 10px;
        font-size: 20px;
        font-weight: 700;
    }
    .modal-town__form {
        margin-left: 10px;
        margin-top: 10px;
    }
    .modal-town__form--text {
        font-size: 16px;
        font-weight: 400;
        margin-bottom: 5px;
    }
    .modal-town__form--block {
        display: flex;
        margin-top: 26px;
    }
    .modal-town__form--button {
        display: block;
        margin: 0 auto;
        width: 40%;
        background: #00a814;
        border: none;
        &:last-child {
            background: #e51f1f;
        }
    }
    .modal-town__form--input {
        width: 98%;
        margin-top: 10px;
    }
@media screen and (max-width: 1000px) {
    .modal-town__box {
        left: 20%;
    }
}
@media screen and (max-width: 638px) {
    .modal-town__box {
        left: 0%;
    }
}
@media screen and (max-width: 250px) {
    .modal-town__box {
        height: 260px;
    }
    .modal-town__form--block {
        display: block;
    }
    .modal-town__form--button {
        margin: 10px 0px;
    }
}
</style>