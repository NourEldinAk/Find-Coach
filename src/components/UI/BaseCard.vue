<template>
  <div class="card">
    <slot></slot>
  </div>
</template>
<style scoped>
  .card {
    max-width: 45rem;
    padding: 1rem 2rem;
    margin: 2rem auto;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    border-radius: 12px;
  }
</style>
