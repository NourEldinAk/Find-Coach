<template>
  <button v-if="!link" :class="mode">
    <slot></slot>
  </button>
  <router-link v-else :to="to" :class="mode">
    <slot></slot>
  </router-link>
</template>
<script>
  export default {
    props: {
      link: {
        type: Boolean,
        required: false,
        default: false,
      },
      to: {
        type: String,
        required: false,
        default: "/",
      },
      mode: {
        type: String,
        required: false,
        default: null,
      },
    },
  };
</script>
<style scoped>
  button,
  a {
    text-decoration: none;
    font: inherit;
    padding: 0.75rem 1.5rem;
    margin: 0 0.5rem;
    border-radius: 30px;
    color: white;
    cursor: pointer;
    border: 1px solid #3a0061;
    background-color: #3a0061;
    display: inline-block;
  }
  button:focus {
    outline: none;
  }
  a:hover,
  a:active,
  button:hover,
  button:active {
    background-color: #270041;
    border-color: #270041;
  }
  .flat {
    background-color: transparent;
    color: #3a0061;
    border: none;
  }
  .outline {
    background: transparent;
    border-color: #270041;
    color: #270041;
  }
  .outline:hover,
  .flat:hover,
  .flat:active,
  .outline:active {
    background-color: #edd2ff;
  }
</style>
