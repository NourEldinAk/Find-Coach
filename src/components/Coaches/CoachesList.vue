<template>
  <div>
    <section>
      <base-dialog
        :show="!!error"
        title="An error occured"
        @close="handleError"
      >
        <h3>{{ error }}</h3>
      </base-dialog>
    </section>
    <section>
      <filter-coaches @change-areas="onChange"></filter-coaches>
    </section>

    <section>
      <base-card>
        <div class="control">
          <base-button mode="outline" @click="refresh">Refresh</base-button>
          <base-button link to="/register" v-if="!isCoach && isAuth"
            >Register as Coach</base-button
          >
          <base-button link to="/auth?redirect=register" v-if="!isAuth"
            >Login to Register as Coach</base-button
          >
        </div>
        <div class="coaches" v-if="!isLoading">
          <ul>
            <coach-item
              v-for="coach in filteredCoaches"
              :key="coach.id"
              :id="coach.id"
              :firstName="coach.firstName"
              :lastName="coach.lastName"
              :hourlyRate="coach.hourlyRate"
              :areas="coach.areas"
            ></coach-item>
          </ul>
        </div>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <h2 v-if="hasCoaches">No Coaches can be found!</h2>
      </base-card>
    </section>
  </div>
</template>
<script></script>
<script>
  import coachItem from "./CoachItem.vue";
  import FilterCoaches from "./FilterCoaches.vue";
  export default {
    components: {
      coachItem,
      FilterCoaches,
    },
    data() {
      return {
        activeAreas: {
          frontend: true,
          backend: true,
          career: true,
        },
        isLoading: false,
        error: null,
      };
    },
    computed: {
      filteredCoaches() {
        const coaches = this.$store.getters["coaches/coaches"];
        return coaches.filter((coach) => {
          if (this.activeAreas.frontend && coach.areas.includes("frontend")) {
            return true;
          }
          if (this.activeAreas.backend && coach.areas.includes("backend")) {
            return true;
          }
          if (this.activeAreas.career && coach.areas.includes("career")) {
            return true;
          }
          return false;
        });
      },
      isCoach() {
        return this.$store.getters["coaches/isCoach"];
      },
      hasCoaches() {
        return this.filteredCoaches.length <= 0 && !this.isLoading;
      },
      isAuth() {
        return this.$store.getters.isAuthenticated;
      },
    },
    methods: {
      onChange(filteredCoaches) {
        this.activeAreas = filteredCoaches;
      },
      async loadCoaches(refresh = false) {
        this.isLoading = true;
        try {
          await this.$store.dispatch("coaches/loadCoaches", refresh);
        } catch (error) {
          this.error = error.message || "Something Went Wrong";
        }
        this.isLoading = false;
      },
      refresh() {
        this.loadCoaches(true);
      },
      handleError() {
        this.error = null;
      },
    },
    created() {
      this.loadCoaches();
    },
  };
</script>
<style scoped>
  .control {
    display: flex;
    justify-content: space-between;
    padding: 1rem;
  }
  div ul {
    list-style: none;
    padding: 0;
  }
</style>
