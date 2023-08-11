<script setup>
import { inject } from 'vue'
const me = inject('me')
</script>

<template>
  <button @click="$gf.selectActor().then(actor=>me=actor)" class="login">
    <img src="../media/oyster.gif" />
    <p>
      ↑ click here to log
      <template v-if="true">
        out
      </template>
      <template v-else>
        in
      </template>
      ↑
    </p>
  </button>
</template>