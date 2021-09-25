<template>
  <div>
    <section>
      <base-card>
        <h2>{{ fullName }}</h2>
        <h3>${{ hourlyRate }}/hour</h3>
      </base-card>
    </section>
    <section>
      <base-card>
        <h2>Interested? Reach out now!</h2>
        <base-button link :to="contactLink">Contact</base-button>

        <section>
          <router-view></router-view>
        </section>
      </base-card>
    </section>
    <section>
      <base-card>
        <span v-for="area in areas" :key="area">
          <base-badge :mode="area">{{ area }}</base-badge>
        </span>
        <p>{{ desc }}</p>
      </base-card>
    </section>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        selectedCoach: null,
        isMessageSent: false,
      };
    },
    props: ["id"],
    computed: {
      fullName() {
        return this.selectedCoach.firstName + " " + this.selectedCoach.lastName;
      },
      desc() {
        return this.selectedCoach.description;
      },
      hourlyRate() {
        return this.selectedCoach.hourlyRate;
      },
      areas() {
        return this.selectedCoach.areas;
      },
      contactLink() {
        return "/coaches/" + this.id + "/contact";
      },
    },

    methods: {},
    created() {
      this.selectedCoach = this.$store.getters["coaches/coaches"].find(
        (coach) => coach.id === this.id
      );
    },
  };
</script>
<style scoped>
  /* .details {
  } */
</style>
