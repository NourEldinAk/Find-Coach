<template>
  <div class="badge" :class="mode">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    props: ["mode"],
  };
</script>
<style scoped>
  .badge {
    padding: 0.75rem 1.5rem;
    margin: 0.5rem 0.5rem;
    margin-left: 0;
    background-color: transparent;
    border: 1px solid transparent;
    border-radius: 30px;
    color: white;
    font-weight: bold;
    font-size: 1.1rem;
    text-transform: uppercase;
    display: inline-block;
  }
  .frontend {
    background-color: #3d008d;
    border-color: #3d008d;
  }
  .backend {
    background-color: #71008d;
    border-color: #71008d;
  }
  .career {
    background-color: #8d006e;
    border-color: #8d006e;
  }
  .graphic {
    background-color: #009688;
    border-color: #009688;
  }
  .games {
    background-color: #00bcd4;
    border-color: #00bcd4;
  }
</style>
