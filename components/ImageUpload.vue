<template>
  <div class="mx-auto mt-4 bg-gray-100">
    <div v-if="$apollo.loading">Loading...</div>
    <div
      v-if="img"
      v-lazy:background-image="`${img}`"
      class="relative h-48 bg-no-repeat bg-contain"
    >
      <button
        v-if="!multi"
        type="button"
        @click="removeImage(img)"
        class="absolute top-0 right-0 flex items-center justify-center w-8 h-8 bg-gray-300 rounded-full cursor-pointer fab hover:bg-gray-200"
      >
        <XIcon />
      </button>
    </div>
    <form enctype="multipart/form-data" novalidate v-else>
      <div
        class="relative flex items-center justify-center h-48 p-4 text-center text-gray-600 border-2 border-gray-200 border-dashed cursor-pointer bg-cgray-200 hover:bg-blue-200"
      >
        <input
          :multiple="multi"
          type="file"
          name="photos"
          :disabled="isSaving"
          @change="uploadPhoto"
          accept="image/*"
          class="absolute w-full h-48 opacity-0 cursor-pointer"
        />
        <p v-if="isInitial">
          Drag {{ name }} here to upload <br />or click to browse
        </p>
        <p v-if="isSaving">Uploading {{ fileCount }} files...</p>
        <p v-if="isSuccess">{{ fileCount }} files uploaded successfully...</p>
        <p v-if="isFailed">
          Upload failed. Please
          <a @click="currentStatus = 0">try again</a>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
import fileUpload from '~/../shared/gql/file/fileUpload.gql'
import deleteFile from '~/../shared/gql/product/deleteFile.gql'
import { XIcon } from 'vue-feather-icons'
const STATUS_INITIAL = 0,
  STATUS_SAVING = 1,
  STATUS_SUCCESS = 2,
  STATUS_FAILED = 3
export default {
  // name required for removing
  props: {
    image: { required: false, default: '' },
    name: { type: String, required: false, default: 'banner' },
    folder: { type: String, required: false, default: 'img' },
    crunch: { type: Boolean, required: false, default: false },
    multi: { type: Boolean, required: false, default: false },
  },
  watch: {
    image() {
      this.img = this.image
    },
  },
  components: { XIcon },
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
