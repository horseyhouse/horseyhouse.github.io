<script setup>
import { ref, inject } from 'vue'
const gf = inject('graffiti')

const imageData = ref(null)
const loading = ref(false)

const context = 'url:horsey.house/photos'

function onImage(event) {
  imageData.value = null
  const file = event.target.files[0]
  if (file) {
    loading.value = true
    const reader = new FileReader()
    reader.addEventListener(
      "load",
      async () => {
        loading.value = false
        imageData.value = reader.result
      }
    )
    reader.readAsDataURL(file);
  }
}

async function postImage() {
  if (!imageData.value) {
    alert("Select an image!")
  }

  await gf.post({
    type: "Image",
    src: imageData.value,
    context: [context]
  })
}


const { posts } = gf.usePosts(context)
</script>

<template>
  <template v-if="!$gf.me">
    You gotta log in horsie
  </template>
  <template v-else>
    <form @submit.prevent="postImage">
      Choose an image: <input type="file" accept="image/*" @change="onImage"/>
      <img v-if="loading" src="../media/loading.gif">
      <img v-else-if="imageData" :src="imageData">
      <input :disabled="!imageData" type="submit">
    </form>
    <ul>
      <li v-for="post of posts">
        <img :src="post.src" />
        <menu v-if="post.actor==$gf.me">
          <li @click="$gf.delete(post)">
            Delete
          </li>
        </menu>
      </li>
    </ul>
  </template>
</template>