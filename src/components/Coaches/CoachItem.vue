<template>
  <li>
    <h2>{{ FullName }}</h2>
    <h3>${{ hourlyRate }}/hour</h3>
    <span v-for="area in areas" :key="area">
      <base-badge :mode="area">{{ area }}</base-badge>
    </span>
    <div class="actions">
      <base-button mode="outline" link :to="contactLink">Contact</base-button>
      <base-button link :to="coachesLink">View Details</base-button>
    </div>
  </li>
</template>
<script>
  export default {
    props: ["firstName", "lastName", "desc", "hourlyRate", "areas", "id"],
    computed: {
      FullName() {
        return this.firstName + " " + this.lastName;
      },
      coachesLink() {
        return "/coaches/" + this.id;
      },
      contactLink() {
        return "/coaches/" + this.id + "/contact";
      },
    },
  };
</script>
<style scoped>
  li {
    border: 2px solid #3d008d;
    padding: 1.3rem 2rem 2rem;
    border-radius: 15px;
    margin: 0.9rem auto;
  }
  li h2 {
    margin-bottom: 0;
  }
  li h3 {
    margin: 0.5rem 0;
    font-size: 1.1rem;
    font-weight: bold;
  }
  .actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 0.8rem;
  }
  .actions button,
  .actions a {
    margin: 0 0.6rem;
  }
</style>
