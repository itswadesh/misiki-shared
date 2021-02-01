<template>
  <content-loader
    :height="1000"
    :speed="2"
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
  >
    <rect x="0" y="2" rx="0" ry="0" width="400" height="185" />
    <rect x="20" y="240" rx="4" ry="4" width="130" height="25" />
    <rect x="20" y="290" rx="4" ry="4" width="75" height="20" />
    <rect x="350" y="290" rx="30" ry="30" width="30" height="30" />
    <rect x="200" y="290" rx="4" ry="4" width="55" height="30" />
    <rect x="20" y="205" rx="4" ry="4" width="20" height="20" />
    <rect x="100" y="205" rx="4" ry="4" width="40" height="20" />
    <rect x="180" y="205" rx="4" ry="4" width="100" height="20" />
    <rect x="330" y="205" rx="4" ry="4" width="60" height="20" />
    <rect x="0" y="335" rx="0" ry="0" width="400" height="25" />
    <rect x="150" y="100" rx="4" ry="4" width="55" height="25" />
    <rect x="20" y="390" rx="4" ry="4" width="150" height="35" />
    <!-- <rect x="20" y="450" rx="50" ry="50" width="100" height="100"/> -->
    <rect x="20" y="450" rx="50" ry="50" width="100" height="100" />
    <!-- <rect x="20" y="450" rx="4" ry="4" width="110" height="90"/> -->
    <rect x="150" y="480" rx="4" ry="4" width="80" height="15" />
    <rect x="150" y="450" rx="4" ry="4" width="110" height="25" />
    <rect x="20" y="600" rx="4" ry="4" width="150" height="30" />
    <rect x="20" y="650" rx="4" ry="4" width="110" height="90" />
    <rect x="150" y="650" rx="4" ry="4" width="110" height="90" />
    <rect x="280" y="650" rx="4" ry="4" width="110" height="90" />
  </content-loader>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
export default {
  components: { ContentLoader },
}
</script>

<style></style>
