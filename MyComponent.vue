<!-- MyComponent.vue -->

<template lang="html">
  <div>
    <h1>{{ message }}</h1>
    <p>{{$store.state.translations['MyComponent.0']}}</p>
    <a href="">{{$store.state.translations['MyComponent.1']}}</a>
    <ul>
      <li>{{$store.state.translations['MyComponent.2']}}</li>
      <li>{{$store.state.translations['MyComponent.3']}}</li>
      <li>{{$store.state.translations['MyComponent.4']}}</li>
      <li>{{$store.state.translations['MyComponent.5']}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "Hello, Vue!",
    };
  },
};
</script>

<style scoped>
/* Your component styles here */
</style>
