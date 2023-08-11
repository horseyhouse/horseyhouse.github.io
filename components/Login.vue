<template>
  <button @click="$gf.selectActor" class="login">
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