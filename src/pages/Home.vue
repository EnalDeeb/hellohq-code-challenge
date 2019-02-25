<template>
<v-container>
    <v-layout
      text-xs-center justify-center
      wrap class="main-container"
    >
<!--     <load-btn />
    <List /> -->

  <popper
    trigger="click"
    :options="{
      placement: 'bottom-end',
      modifiers: { offset: { offset: '30px,0' } }
    }">
    <div class="popper elevation-4 px-2">
      <List />
    </div>

    <button slot="reference">
      <load-btn />      
    </button>
  </popper>    
    </v-layout>
  </v-container>    
</template>

<script>
import LoadBtn from '../components/LoadBtn'
import List from '../components/List'
import Popper from 'vue-popperjs'
import 'vue-popperjs/dist/vue-popper.css'

  export default {
    components: {LoadBtn, List, Popper}
  }
</script>

<style>
.main-container {
  position: relative;
}


.popper {
  background-color: white;
  min-width: 200px;
  min-height: 50px;
  border-radius: 20px;
}
.popper .popper__arrow {
  width: 0;
  height: 0;
  border-style: solid;
  position: absolute;
  margin: 5px;
}
.popper[x-placement^="top"] {
  margin-bottom: 5px;
}
.popper[x-placement^="top"] .popper__arrow {
  border-width: 50px 50px 0 50px;
  border-color: white transparent transparent transparent;
  bottom: -50px;
  left: calc(50% - 50px);
  margin-top: 0;
  margin-bottom: 0;
}
.popper[x-placement^="bottom"] {
  margin-top: 5px;
}
.popper[x-placement^="bottom"] .popper__arrow {
  border-width: 0 20px 20px 20px;
  border-color: transparent transparent #fafafa transparent;
  top: -20px;
  left: calc(50% - 20px);
  margin-top: 0;
  margin-bottom: 0;
}

</style>


