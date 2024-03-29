<template>
  <div class="relative mx-auto mt-4">
    <div v-if="$apollo.loading">Loading...</div>
    <div class="flex justify-center">
      <span
        class="inline-block w-20 h-20 p-2 text-center text-gray-600 bg-gray-200 rounded-full"
      >
        <div class="flex" v-if="img">
          <button
            type="button"
            @click="removeImage(img)"
            class="absolute flex items-center justify-center w-8 h-8 ml-12 border rounded-full cursor-pointer hover:bg-gray-200"
          >
            <XIcon />
          </button>
          <img v-lazy="img" alt class="object-cover w-16 h-16 rounded-full" />
        </div>
        <form enctype="multipart/form-data" novalidate v-else>
          <div class="dropbox hover:bg-blue-200">
            <input
              multiple
              type="file"
              name="photos"
              :disabled="isSaving"
              @change="uploadPhoto"
              accept="image/*"
              class="absolute w-full opacity-0 cursor-pointer"
            />
            <p v-if="isInitial">+</p>
          </div>
        </form>
      </span>
    </div>
  </div>
</template>

<script>
import fileUpload from '~/gql/file/fileUpload.gql'
import deleteFile from '~/gql/product/deleteFile.gql'
import { XIcon } from 'vue-feather-icons'
const STATUS_INITIAL = 0,
  STATUS_SAVING = 1,
  STATUS_SUCCESS = 2,
  STATUS_FAILED = 3
export default {
  // name required for removing
  props: {
    image: { required: false, default: '' },
    name: { required: false, default: 'avatar' },
    folder: { required: false, default: 'avatar' },
  },
  components: {
    XIcon,
  },
  watch: {
    image() {
      this.img = this.image
    },
  },
  data() {
    return {
      img: null,
      currentStatus: 0,
      data: null,
      error: null,
    }
  },
  mounted() {
    this.img = this.image
  },
  computed: {
    isInitial() {
      return this.currentStatus === STATUS_INITIAL
    },
    isSaving() {
      return this.currentStatus === STATUS_SAVING
    },
    isSuccess() {
      return this.currentStatus === STATUS_SUCCESS
    },
    isFailed() {
      return this.currentStatus === STATUS_FAILED
    },
  },
  methods: {
    async uploadPhoto({ target }) {
      try {
        this.$store.commit('clearErr')
        let images = (
          await this.$apollo.mutate({
            mutation: fileUpload,
            variables: { files: target.files, folder: this.folder },
            fetchPolicy: 'no-cache',
          })
        ).data.fileUpload
        images = images.map((o) => o.filename)
        if (!this.multi) {
          this.img = images[0]
          this.$emit('save', this.name, this.img)
        } else {
          this.$emit('save', this.name, images)
        }
      } catch (e) {
        console.log('err... ', e)
        this.$store.commit('setErr', e)
      }
    },
    imgPath(i) {
      return `${i}?a=${Math.random()}`
    },
    save(imagePath) {
      this.img = imagePath
      this.$emit('save', this.name, imagePath)
    },
    removeImage(image) {
      let vm = this
      this.$swal({
        title: 'Delete image?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
        if (result.value) {
          vm.deleteConfirmed(image)
        }
      })
    },
    async deleteConfirmed(image) {
      try {
        this.$store.commit('clearErr')
        this.img = ''
        await this.$apollo.mutate({
          mutation: deleteFile,
          variables: { path: image },
          fetchPolicy: 'no-cache',
        })
        this.$emit('remove', this.name)
      } catch (e) {
        this.$store.commit('setErr', e)
      } finally {
        this.$store.commit('busy', false)
      }
    },
  },
}
</script>

<style scoped></style>
