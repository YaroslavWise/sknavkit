<template lang="pug">
div.navigation-frame
  a-scene
    a-entity(v-if="currentStep")
      a-entity(v-bind:overunder="currentStep.image")
      a-entity(v-bind:rotation="'0 ' + currentStep.marker + ' 0'")
        a-plane(v-on:click="nextStep()" src="./panos/arrow.png" height=".5" width=".5" position="0 0.5 -3" material="transparent:true")
        a-plane(v-if="!hasNext()" src="./panos/done.png" height="5" width="5" position="0 2 -8" material="transparent:true")
    a-camera(position="0 0 0" stereocam="eye:left;")
      a-entity(v-if="inVRmode && hasNext()"
          cursor="fuse: true;"
          position="0 0 -1"
          geometry="primitive: ring; radiusInner: 0.02; radiusOuter: 0.03"
          material="color: black; shader: flat")
        a-animation(begin="click" easing="ease-in" attribute="scale" dur="150"
                   fill="forwards" from="0.1 0.1 0.1" to="1 1 1")
        a-animation(begin="cursor-fusing" easing="ease-in" attribute="scale" dur="1500"
                   fill="backwards" from="1 1 1" to="0.1 0.1 0.1")
  div.helper(v-if="!inVRmode") < Вращайте изображение >
  div.helper.description(v-if="!inVRmode") Подойдите в указанном направлении и нажмите "далее"
  a.next(v-on:click="nextStep()" v-if="!inVRmode && hasNext()") Далее
  a.next.ready(v-if="!inVRmode && !hasNext()") Вы на месте!
  a.prev(v-on:click="prevStep()" v-if="!inVRmode && hasPrev()") Назад
</template>

<script lang="coffee">
require '@/aframe-overunder-viewer.min.js'
$ = require 'jquery'

export default {
  name: 'navigation'
  data: -> {
    inVRmode: false
    stepId: 0
    currentStep: null
    routes:
      beijin: [
        image: 'panos/entrance_top.jpg'
        marker: 190
      ,
        image: 'panos/entrance_first.jpg'
        marker: -30
      ,
        image: 'panos/beijin1.jpg'
        marker: -55
      ,
        image: 'panos/beijin2.jpg'
        marker: -0
      ]
      belu: [
        image: 'panos/entrance_top.jpg'
        marker: 190
      ,
        image: 'panos/entrance_first.jpg'
        marker: -125
      ,
        image: 'panos/green_zone.jpg'
        marker: -100
      ,
        image: 'panos/belu1.jpg'
        marker: -78
      ,
        image: 'panos/belu2.jpg'
        marker: -85
      ]
  }
  methods:
    hasPrev: -> @stepId > 0
    hasNext: -> @routes[@$route.params.roomCode].length - 1 > @stepId
    prevStep: ->
      @stepId--
      @currentStep = @routes[@$route.params.roomCode][@stepId]
    nextStep: ->
      return if @routes[@$route.params.roomCode].length - 1 <= @stepId
      @stepId++
      @currentStep = @routes[@$route.params.roomCode][@stepId]
  mounted: ->
    @currentStep = @routes[@$route.params.roomCode][@stepId]

    document.querySelector('a-scene').addEventListener 'enter-vr', () =>
      @inVRmode = true
    document.querySelector('a-scene').addEventListener 'exit-vr', () =>
      @inVRmode = false
    true
}
</script>

<style lang="stylus">
.navigation-frame
  width: 100%;
  height: 100%;
.debug
  position: relative;
  z-index: 999

.helper
  position: absolute;
  z-index: 999
  top: 30px;
  width: 100%;
  text-align: center;
  color: #fff;
  font-size: 20px;
  font-weight: bolder;

  &.description
    top: 80px;
    font-weight: normal;
    font-size: 14px;

.prev
  display: block;
  position: absolute;
  z-index: 999;
  bottom: 15px;
  width: 100%;
  text-align: center;
  font-weight: bold;
  color: #fff;

.next
  display: block;
  position: absolute;
  z-index: 999
  bottom: 50px;
  width: 80%;
  margin: 0 10%
  padding: 10px 0;
  background: #368713;
  font-size: 20px;
  font-weight: bolder;
  color: #fff;

  &.ready
    background: #fff;
    color: #000;
</style>
