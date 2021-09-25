<template>
  <section>
    <base-card>
      <h2>Page Not Found</h2>
      <p>
        page couldn't be fetched - maybe check our
        <router-link to="/coaches">Coaches</router-link>
      </p>
    </base-card>
  </section>
</template>
<style scoped>
  a {
    text-decoration: none;
    font-weight: bold;
    color: #3d008d;
    padding: 0.3rem;
    border-bottom: 2px solid #3d008d;
    transition: all 0.2s ease-out;
  }
  a:hover {
    color: #3d008d8f;
    border-color: #3d008d8f;
  }
</style>
