<template>
  <section>
    <header>
      <div class="brand">
        <router-link link to="/">Find a Coach </router-link>
      </div>
      <nav>
        <ul>
          <li>
            <router-link link to="/coaches">All Coaches </router-link>
          </li>
          <li v-if="isAuth">
            <router-link link to="/requests"> Requests</router-link>
          </li>
          <li v-else><router-link to="/auth">Login</router-link></li>
          <li v-if="isAuth">
            <a @click="logout">Logout</a>
          </li>
        </ul>
      </nav>
    </header>
  </section>
</template>
<script>
  export default {
    computed: {
      isAuth() {
        return this.$store.getters.isAuthenticated;
      },
    },
    methods: {
      logout() {
        this.$store.dispatch("logout");
        this.$router.replace("/auth");
      },
    },
  };
</script>
<style scoped>
  section {
    width: 100%;
    height: 6rem;
    background-color: #3d008d;
  }
  header {
    width: 90%;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    height: 100%;
  }

  nav ul {
    list-style: none;
    display: flex;
  }
  nav ul li {
    margin: 0 1rem;
    font-size: 1.2rem;
  }
  a {
    text-decoration: none;
    color: #f391e3;
    border: 1px solid transparent;
    padding: 0.75rem 1.5rem;
    cursor: pointer;
    user-select: none;
  }
  a:active,
  a:hover,
  a.router-link-active {
    border: 1px solid #f391e3;
  }
  .brand a {
    font-size: 1.5rem;
    color: white;
    border: none;
    font-weight: bold;
  }
</style>
