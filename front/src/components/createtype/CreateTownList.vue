<template>
    <Loader v-if="loader" />
    <div class="town-list" v-else>
        <div class="container">
            <div class="town-list__box-head">
                <div class="town-list__item-head">
                    Назва міста
                </div>
                <div class="town-list__item-head" v-if="user.role_id == 1">
                    Редагувати
                </div>
                <div class="town-list__item-head" v-if="user.role_id == 1">
                    Видалити
                </div>
            </div>
            <div class="town-list__box-body" v-for="town in towns" :key="town.id">
                <div class="town-list__item-body">
                    <span class="town-list__item-body--responsive">Назва міста: </span>{{town.name}}
                </div>
                <div class="town-list__item-body edit" @click.prevent="showEdit(town.id, town.name)" v-if="user.role_id == 1">
                    Редагувати
                </div>
                <div class="town-list__item-body delete" @click.prevent="deleteTown(town.id)" v-if="user.role_id == 1">
                    Видалити
                </div>
            </div>
        </div>
        <ModalEditTownCreate v-if="showModalEdit" 
            :showModalEdit = "showModalEdit"
            :id = "id"
            :name = "name"
            @CancelEdit="ChangeModalEdit"
        />
    </div>
</template>

<script>
import ModalEditTownCreate from '../modals/ModalEditTownCreate'
import Loader from '../app/Loader'
import axios from 'axios'

export default {
    name: "CreateTownList",
    data: () => ({
        towns: [],
        id: '',
        name: '',
        showModalEdit: false,
        loader: true
    }),
    mounted() {
        this.getTowns()
    },
    methods: {
        async getTowns() {
            try {
                const result = await axios.get('/api/town', {
                    headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
                })
                this.towns = result.data
                this.loader = false
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
            this.getTowns()
        },
        async deleteTown(id) {
            try  {
                const agree = confirm("Ви впевнені, що бажаєте видалити?")
                if (agree) {
                    await axios.delete(`/api/town/${id}`, {
                        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
                    })
                    this.getTowns()
                }
            } catch (e) {
                alert('Відбулася помилка')
            }
        }
    },
    computed: {
        user() {
            return this.$store.state.auth.newuser.user
        }
    },
    components: {
        ModalEditTownCreate,
        Loader
    }
}
</script>

<style lang="scss" scoped>
    .town-list {
        margin-bottom: 30px;
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
        overflow: hidden;
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
        overflow: hidden;
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
}
</style>