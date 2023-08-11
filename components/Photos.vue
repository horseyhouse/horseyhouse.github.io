<script setup>
import { ref, inject } from 'vue'
const gf = inject('graffiti')
const me = inject('me')

const imageData = ref('')

const context = 'horsehorsehorse'

function onImage(event) {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader();
    reader.addEventListener(
      "load",
      async () => {
        imageData.value = reader.result
        await gf.post({
          type: "Image",
          src: reader.result,
          context: ['horsehorsehorse']
        }, me.value)
      }
    )
    reader.readAsDataURL(file);
  }
}

const { posts } = gf.usePosts(context)
</script>

<template>
  <input type="file" accept="image/*" @change="onImage"/>

  <ul>
    <li v-for="post of posts">
      <img :src="post.src" />
    </li>
  </ul>
</template>