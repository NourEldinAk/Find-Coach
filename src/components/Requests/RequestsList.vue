<template>
  <div>
    <base-dialog :show="!!error" title="An error occured" @close="handleError">
      <h3>{{ error }}</h3>
    </base-dialog>
    <section>
      <base-card>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <div v-else>
          <div class="container">
            <h2>Requests Received</h2>
            <p class="no-message" v-if="requests.length === 0">
              you haven't received any requests yet!
            </p>
            <div
              class="request"
              v-for="request in requests"
              :key="request.email"
            >
              <a :href="'mailto:' + request.email">{{ request.email }}</a>
              <p>{{ request.message }}</p>
            </div>
          </div>
        </div>
      </base-card>
    </section>
  </div>
</template>
<script>
  export default {
    data() {
      return { isLoading: false, error: null };
    },
    computed: {
      requests() {
        return this.$store.getters["requests/getRequests"];
      },
    },
    methods: {
      async loadRequests() {
        this.isLoading = true;
        try {
          await this.$store.dispatch("requests/loadRequests");
        } catch (error) {
          this.error = error.message || "something went wrong";
        }
        this.isLoading = false;
      },
      handleError() {
        this.error = null;
      },
    },
    created() {
      this.loadRequests();
    },
  };
</script>
<style scoped>
  .container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .container h2 {
    text-align: center;
  }
  a {
    text-decoration: none;
    font-weight: bold;
    font-size: 1.3rem;
    color: #3d008d;
  }
  a:hover,
  a:active {
    color: #3d008db2;
  }
  .request {
    border: 1px solid #ccc;
    padding: 1rem;
    margin-top: 1rem;
    width: 80%;
    text-align: center;
  }
  .no-message {
    width: 100%;
    margin-top: 0;
    text-align: center;
    font-weight: bold;
  }
</style>
