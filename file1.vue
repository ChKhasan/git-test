<template>
  <div>
    <h1 class="class qul qweuqwie">{{$store.state.translations['file1.0']}}</h1>
    <p>{{$store.state.translations['file1.1']}}</p>
    <ul class="test_branch">
      <li>{{ $store.state.translations["file1.2"] }}</li>
      <li>{{ $store.state.translations["file1.3"] }}</li>
      <li>{{ $store.state.translations["file1.4"] }}</li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style scoped></style>
