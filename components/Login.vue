<script setup>
import { inject } from 'vue'
const me = inject('me')
const graffiti = inject('graffiti')

async function logIn() {
  me.value = await graffiti.selectActor()
  localStorage.setItem("me", me.value)
}
</script>

<template>
  <button @click="logIn" class="login">
    <img src="../media/oyster.gif" />
    <p>
      ↑ click here to log in ↑
    </p>
  </button>
</template>