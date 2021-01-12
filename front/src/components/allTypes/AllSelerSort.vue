<template>
    <div class="seler-sort">
        <div class="container">
            <h2 class="seler-sort__headline">Параметри сортування</h2>
            <form class="seler-sort__form">
                <div class="seler-sort__form--data">
                    <p class="seler-sorm__for--info">За датою</p>
                    <input type="text" class="seler-sort__form--input input" placeholder="Початкова дата">
                    <input type="text" class="seler-sort__form--input input" placeholder="Кінцева дата">
                </div>
                <input type="text" class="seler-sort__form--input input" placeholder="За фірмою">
                <input type="text" class="seler-sort__form--input input" placeholder="За областю">
                <input type="text" class="seler-sort__form--input input" placeholder="За маркою товару">
                <input type="text" class="seler-sort__form--input input" placeholder="За населеним пунктом">
                <input type="text" class="seler-sort__form--input input" placeholder="За менеджером">
                <input type="text" class="seler-sort__form--input input" placeholder="За номером машини">
                <input type="submit" value="Відсортувати" class="seler-sort__form--button button">
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: "AllSelerSort"
}
</script>

<style lang="scss" scoped>
    .seler-sort {
        margin-top: 30px;
    }
    .seler-sort__headline {
        color: #000;
        font-size: 20px;
        font-weight: 700;
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
</style>