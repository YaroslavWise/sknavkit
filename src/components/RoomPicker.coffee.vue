<template lang="pug">
div
  div.logo
    img(src="../assets/logo.png" v-on:click="flushMenu($event)")
  div.menu.main(v-if="!pickedItem")
    a.menu-item(v-for="item in menu" v-on:click="pickMenu(item)" v-bind:style="{background:item.color}") {{item.title}}

  div.menu(v-if="pickedItem")
    a.menu-item(v-for="item in pickedItem.submenu" v-on:click="goNavigation(item)" v-bind:style="{background:pickedItem.color}" v-bind:class="{disabled:item.disabled}") {{item.title}}

  a.back(v-if="pickedItem" v-on:click="flushMenu($event)") К выбору зоны
</template>

<script lang="coffee">
export default {
  name: 'app'
  data: -> {
    menu: [
      title: 'Китай'
      color: '#E57480'
      submenu: [
        title: 'Пекин'
        code: 'beijin'
      ,
        title: 'Шанхай'
        code: 'shanghai'
        disabled: true
      ]
    ,
      title: 'Бразилия'
      color: '#83BD52'
      submenu: [
        title: 'Сан-Паулу'
        code: 'sanpaulu'
        disabled: true
      ,
        title: 'Рио-де-Жанейро'
        code: 'rio'
        disabled: true
      ,
        title: 'Белу-Оризонти'
        code: 'belu'
      ]
    ]
    pickedItem: null
  }
  methods:
    pickMenu: (item) -> @pickedItem = item
    flushMenu: -> @pickedItem = null
    goNavigation: (item) ->
      return if item.disabled
      @$router.push
        name: 'navigation'
        params:
          roomCode: item.code

}
</script>

<style lang="stylus" scoped>
.logo
  display: block;
  margin-top: 60px;
  margin-bottom: 40px;
  img
    width: 80%;
.menu
  border 1px solid #ccc
  margin: 10px 50px;

  .menu-item
    display: block;
    padding: 20px;
    border-bottom 1px solid #ccc
    color #fff
    font-weight: bolder;

    &.disabled
      opacity: 0.4

    &:last-child
      border-bottom: 0;

.back
  display: block;
  margin-top: 20px;
  margin-bottom: 50px;
  font-weight: bold;
</style>
