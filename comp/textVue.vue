<!-- SimpleComponent.vue -->

<template lang="html">
  <div>
    <h1>{{$store.state.translations['textVue.0']}}</h1>
    <p>{{$store.state.translations['textVue.1']}}</p>
    <ul>
      <li>{{$store.state.translations['textVue.2']}}</li>
      <li>{{$store.state.translations['textVue.3']}}</li>
      <li>{{$store.state.translations['textVue.4']}}</li>
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
