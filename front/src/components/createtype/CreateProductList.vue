<template>
    <Loader v-if="loader" />
    <div class="town-list" v-else>
        <div class="container">
            <h2 class="town-form__headline">Створення продукта</h2>
            <form class="town-form__create" @submit.prevent="createProductName">
                <input type="text" class="town-form__create--input input" placeholder="Назва продукта" v-model="name"
                    :class="{invalid: ($v.name.$dirty && !$v.name.required)}"
                >
                <input type="submit" value="Створити" class="town-form__create--button button">
            </form>
            <div class="town-list__box-head">
                <div class="town-list__item-head">
                    Назва продукта
                </div>
                <div class="town-list__item-head">
                    Редагувати
                </div>
                <div class="town-list__item-head">
                    Видалити
                </div>
            </div>
            <div class="town-list__box-body" v-for="productName in productNames" :key="productName.id">
                <div class="town-list__item-body">
                    <span class="town-list__item-body--responsive">Назва продукта: </span>{{productName.name}}
                </div>
                <div class="town-list__item-body edit" @click.prevent="showEdit(productName.id, productName.name)">
                    Редагувати
                </div>
                <div class="town-list__item-body delete" @click.prevent="deleteProductName(productName.id)">
                    Видалити
                </div>
            </div>
        </div>
        <ModalEditProductCreate v-if="showModalEdit" 
            :showModalEdit = "showModalEdit"
            :id = "id"
            :name = "name"
            @CancelEdit="ChangeModalEdit"
        />
    </div>
</template>

<script>
import ModalEditProductCreate from '../modals/ModalEditProductCreate'
import Loader from '../app/Loader'
import axios from 'axios'
import {required} from 'vuelidate/lib/validators'

export default {
    name: "CreateProductList",
    data: () => ({
        id: '',
        name: '',
        productNames: [],
        showModalEdit: false,
        loader: true
    }),
    validations: {
        name: {required}
    },
    mounted() {
        this.getProductNames()
    },
    methods: {
        async getProductNames() {
          try {
            const result = await axios.get(`/api/productname`, {
                    headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            this.productNames = result.data
            this.loader = false
          } catch (e) {
              alert('Відбулася помилка')
          }
        },
        async createProductName() {
            if(this.$v.$invalid) {
                this.$v.$touch()
                return
            }

            const formData = {
                name: this.name
            }

            await this.$store.dispatch('createProductName', formData)
            this.name = ''
            this.getProductNames()
        },
        async deleteProductName(id) {
            try  {
                const agree = confirm("Ви впевнені, що бажаєте видалити?")
                if (agree) {
                    await axios.delete(`/api/productname/${id}`, {
                        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
                    })
                    this.getProductNames()
                }
            } catch (e) {
                alert('Відбулася помилка')
            }
        },
        showEdit(id, name) {
           this.showModalEdit = !this.showModalEdit
           this.id = id
           this.name = name
        },
        ChangeModalEdit(data) {
            this.showModalEdit = data
            this.name = ''
            this.getProductNames()
        }
    },
    components: {
        ModalEditProductCreate,
        Loader
    }
}
</script>

<style lang="scss" scoped>
    .town-list {
        margin-top: 30px;
        margin-bottom: 30px;
    }
    .town-form {
        margin: 30px
    }
    .town-form__headline {
        color: #000;
        font-size: 20px;
        font-weight: 700;
    }
    .town-form__create {
        margin-top: 15px;
        margin-bottom: 30px;
    }
    .town-form__create--button {
        background: #00a814;
        margin-left: 10px;
        border: none;
    }
    .town-list__box-head {
        display: flex;
        background: #ccc;
    }
    .town-list__item-head {
        border: 1px solid #000;
        width: 100%;
        color: #000;
        font-weight: 700;
        font-size: 16px;
        padding: 5px;
        text-align: center;
    }
    .town-list__box-body {
        display: flex;
        &:hover {
            background: rgba(0,0,0,0.4);
        }
    }
    .town-list__item-body {
        border: 1px solid #000;
        width: 100%;
        font-weight: 400;
        font-size: 16px;
        padding: 5px;
    }
    .town-list__item-body--responsive {
        font-weight: 700;
        color: #000;
        display: none;
    }
@media screen and (max-width: 500px) {
    .town-list__box-head {
        display: none;
    }
    .town-list__box-body {
        display: block;
        margin-bottom: 15px;
    }
    .town-list__item-body--responsive {
        display: inline-block;
    }
    .town-form__create--button {
        display: block;
        margin-left: 0px;
        margin-top: 10px;
    }
}
</style>