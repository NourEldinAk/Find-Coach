<template>
  <base-card>
    <h2>Find Your Coach</h2>
    <div class="areas">
      <div class="area">
        <label for="frontend">Frontend</label>
        <input
          type="checkbox"
          name="frontend"
          id="frontend"
          checked
          @change="filterArea"
        />
      </div>
      <div class="area">
        <label for="backend">Backend</label>
        <input
          type="checkbox"
          name="backend"
          id="backend"
          checked
          @change="filterArea"
        />
      </div>
      <div class="area">
        <label for="frontend">Career</label>
        <input
          type="checkbox"
          name="career"
          id="career"
          checked
          @change="filterArea"
        />
      </div>
    </div>
  </base-card>
</template>
<script>
  export default {
    emits: ["change-areas"],
    data() {
      return {
        areas: {
          frontend: true,
          backend: true,
          career: true,
        },
      };
    },

    methods: {
      filterArea(event) {
        const inputId = event.target.id;
        const isActive = event.target.checked;
        const filteredAreas = {
          ...this.areas,
          [inputId]: isActive,
        };
        this.areas = filteredAreas;
        this.$emit("change-areas", filteredAreas);
      },
    },
  };
</script>
<style scoped>
  .areas {
    display: flex;
  }
  .area {
    margin: 0 1rem 0 0;
  }
  .area input {
    cursor: pointer;
  }
</style>
