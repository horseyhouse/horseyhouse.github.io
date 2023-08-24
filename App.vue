<script setup>
import Login from './components/Login.vue'
</script>

<template>
  <header>
    <h1>
      <Login />
      <RouterLink to="/">
        Hello
        <template v-if="!$gf.me">
          Anonymous Horse
        </template>
        <template v-else>
          Fellow Horse
        </template>
      </RouterLink>
      <Login />
    </h1>
    <h2>
      <img src="./media/construction.gif" alt="Under Construction">
    </h2>
  </header>

  <main>
    <RouterView />
  </main>
</template>