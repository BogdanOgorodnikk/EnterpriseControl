<template>
    <div class="town-form">
        <div class="container">
            <h2 class="town-form__headline">Створення міста</h2>
            <form class="town-form__create" @submit="createTown">
                <input type="text" class="town-form__create--input input" placeholder="Назва міста" v-model="name"
                    :class="{invalid: ($v.name.$dirty && !$v.name.required) || ($v.name.$dirty && !$v.name.minLength)}"
                >
                <small 
                    class="helper-text__invalid"
                    v-if="$v.name.$dirty && !$v.name.required"
                >Поле назви міста не повинно бути пустим!</small>
                <small class="helper-text__invalid"
                    v-else-if="$v.name.$dirty && !$v.name.minLength"
                >Мінімальна довжина назви міста {{$v.name.$params.minLength.min}} штук! Зараз він: {{name.length}}</small>
                <input type="submit" value="Створити" class="town-form__create--button button">
            </form>
        </div>
    </div>
</template>

<script>
import {required, minLength} from 'vuelidate/lib/validators'

export default {
    name: "CreateTownForm",
    data: () => ({
        name: ''
    }),
    validations: {
        name: {required, minLength: minLength(2)},
    },
    methods: {
        async createTown() {
            if(this.$v.$invalid) {
                this.$v.$touch()
                return
            }
            const formData = {
                name: this.name
            }
            try  {
                await this.$store.dispatch('createTown', formData)
                this.name = ''
            } catch (e) {
                alert('Відбулася помилка')
            }
        }
    }   
}
</script>

<style lang="scss" scoped>
    .town-form {
        margin-top: 30px;
        margin-bottom: 30px;
    }
    .town-form__headline {
        color: #000;
        font-size: 20px;
        font-weight: 700;
    }
    .town-form__create {
        margin-top: 15px;
    }
    .town-form__create--button {
        background: #00a814;
        margin-top: 10px;
        border: none;
        display: block;
    }
</style>