<template>
  <section>
    <the-header></the-header>
  </section>
  <section>
    <router-view v-slot="slotProps">
      <transition name="component" mode="out-in">
        <component :is="slotProps.Component"></component>
      </transition>
    </router-view>
  </section>
</template>
<script>
  import TheHeader from "./components/TheHeader.vue";
  export default {
    components: {
      TheHeader,
    },
    computed: {
      autoLogout() {
        return this.$store.getters.autoLogout;
      },
    },
    watch: {
      autoLogout(curVal, oldVal) {
        if (curVal && curVal !== oldVal) {
          this.$router.replace("/coaches");
        }
      },
    },
    created() {
      this.$store.dispatch("tryLogin");
    },
  };
</script>
<style>
  @import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");
  * {
    box-sizing: border-box;
  }
  html,
  body {
    margin: 0;
    padding: 0;
    font-family: "Roboto", sans-serif;
  }
  .component-enter-from {
    opacity: 0;
    transform: translateY(-30px);
  }
  .component-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }
  .component-enter-active {
    transition: all 0.3s ease-out;
  }
  .component-leave-active {
    transition: all 0.3s ease-in;
  }
  .component-enter-to,
  .component-leave-from {
    opacity: 1;
    transform: translateY(0);
  }
</style>
