<template lang="html">
  <div class="loading-page" v-if="loading || active">
    <img v-lazy="`/loading.svg`" alt="loading ..." />
    <!-- <transition>
        <svg class="spinner" width="44px" height="44px" viewBox="0 0 44 44">
        <circle class="path" fill="none" stroke-width="4" stroke-linecap="round" cx="22" cy="22" r="20"/>
        </svg>
    </transition> -->
    <!-- <p>Loading...</p> -->
  </div>
</template>

<script>
export default {
  props: {
    active: { type: Boolean, required: false },
  },
  data: () => ({
    loading: false,
  }),
  methods: {
    start() {
      this.loading = true
    },
    finish() {
      this.loading = false
    },
  },
}
</script>

<style scoped>
.spinner {
  transition: opacity 0.15s ease;
  animation: rotator 1.4s linear infinite;
  animation-play-state: paused;
}
.spinner.show {
  animation-play-state: running;
}
.spinner.v-enter,
.spinner.v-leave-active {
  opacity: 0;
}
.spinner.v-enter-active,
.spinner.v-leave {
  opacity: 1;
}
.spinner .path {
  stroke: #f60;
  stroke-dasharray: 126;
  stroke-dashoffset: 0;
  transform-origin: center;
  animation: dash 1.4s ease-in-out infinite;
}
@-moz-keyframes rotator {
  0% {
    transform: scale(0.5) rotate(0deg);
  }
  100% {
    transform: scale(0.5) rotate(270deg);
  }
}
@-webkit-keyframes rotator {
  0% {
    transform: scale(0.5) rotate(0deg);
  }
  100% {
    transform: scale(0.5) rotate(270deg);
  }
}
@-o-keyframes rotator {
  0% {
    transform: scale(0.5) rotate(0deg);
  }
  100% {
    transform: scale(0.5) rotate(270deg);
  }
}
@keyframes rotator {
  0% {
    transform: scale(0.5) rotate(0deg);
  }
  100% {
    transform: scale(0.5) rotate(270deg);
  }
}
@-moz-keyframes dash {
  0% {
    stroke-dashoffset: 126;
  }
  50% {
    stroke-dashoffset: 63;
    transform: rotate(135deg);
  }
  100% {
    stroke-dashoffset: 126;
    transform: rotate(450deg);
  }
}
@-webkit-keyframes dash {
  0% {
    stroke-dashoffset: 126;
  }
  50% {
    stroke-dashoffset: 63;
    transform: rotate(135deg);
  }
  100% {
    stroke-dashoffset: 126;
    transform: rotate(450deg);
  }
}
@-o-keyframes dash {
  0% {
    stroke-dashoffset: 126;
  }
  50% {
    stroke-dashoffset: 63;
    transform: rotate(135deg);
  }
  100% {
    stroke-dashoffset: 126;
    transform: rotate(450deg);
  }
}
@keyframes dash {
  0% {
    stroke-dashoffset: 126;
  }
  50% {
    stroke-dashoffset: 63;
    transform: rotate(135deg);
  }
  100% {
    stroke-dashoffset: 126;
    transform: rotate(450deg);
  }
}

.loading-page {
  /* position: fixed; */
  top: 30px;
  left: 0;
  width: 100%;
  height: 100%;
  /* background: rgba(255, 255, 255, 0.8); */
  text-align: center;
  font-size: 30px;
  font-family: sans-serif;
  z-index: 10000;
}
</style>
