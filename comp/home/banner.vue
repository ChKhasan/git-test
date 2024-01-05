<!-- SimpleComponent.vue -->

<template lang="html">
  <div>
    <h1>{{$store.state.translations['banner.0']}}</h1>
    <p>{{$store.state.translations['banner.1']}}</p>
    <ul>
      <li>{{$store.state.translations['banner.2']}}</li>
      <li>{{$store.state.translations['banner.3']}}</li>
      <li>{{$store.state.translations['banner.4']}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  // No data properties in this example
};
</script>

<style scoped>
/* Your component styles here */
</style>
