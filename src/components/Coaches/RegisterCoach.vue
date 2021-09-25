<template>
  <section>
    <base-card>
      <form @submit.prevent="onSubmit">
        <div class="form-control" :class="{ invalid: isFNValid }">
          <label for="firstName">FirstName</label>
          <input type="text" id="firstname" v-model.trim="firstName" />
          <span class="error" v-if="isFNValid"
            >Please enter your first name!
          </span>
        </div>
        <div class="form-control" :class="{ invalid: isLNValid }">
          <label for="lastName">LastName</label>
          <input type="text" id="lastName" v-model.trim="lastName" />
          <span class="error" v-if="isLNValid"
            >Please enter your last name!
          </span>
        </div>
        <div class="form-control" :class="{ invalid: isDescValid }">
          <label for="desc">Description</label>
          <textarea
            name="desc"
            id="desc"
            cols="30"
            rows="3"
            v-model="desc"
            ref="desc"
          ></textarea>
          <span class="error" v-if="isDescValid"
            >Please enter your description!
          </span>
        </div>
        <div class="form-control" :class="{ invalid: isHRValid }">
          <label for="HR">HourlyRate</label>
          <input
            type="number"
            id="HR"
            v-model.number="hourlyRate"
            ref="hourlyRate"
          />
          <span class="error" v-if="isHRValid"
            >Please enter your hourlyRate!
          </span>
        </div>
        <h2>
          Area Of Expertise
        </h2>
        <div class="areas" :class="{ invalid: isAreasValid }">
          <div class="area">
            <label for="frontend">Frontend Development</label>
            <input type="checkbox" value="frontend" v-model="areas" />
          </div>
          <div class="area">
            <label for="backend">Backend Development</label>
            <input type="checkbox" value="backend" v-model="areas" />
          </div>
          <div class="area">
            <label for="career">Career Development</label>
            <input type="checkbox" value="career" v-model="areas" />
          </div>
          <div class="area">
            <label for="graphic">Graphic Designer</label>
            <input type="checkbox" value="graphic" v-model="areas" />
          </div>
          <div class="area">
            <label for="games">Games Development</label>
            <input type="checkbox" value="games" v-model="areas" />
          </div>
          <span class="error" v-if="isAreasValid"
            >Please select your area of expertise!
          </span>
        </div>
        <div class="actions">
          <base-button>Register</base-button>
        </div>
      </form>
    </base-card>
  </section>
</template>
<script>
  export default {
    data() {
      return {
        firstName: "",
        lastName: "",
        desc: "",
        hourlyRate: null,
        areas: [],
        isValid: false,
      };
    },
    computed: {
      isFNValid() {
        return this.firstName === "" && this.isValid;
      },
      isLNValid() {
        return this.lastName === "" && this.isValid;
      },
      isDescValid() {
        return this.desc === "" && this.isValid;
      },
      isHRValid() {
        return this.hourlyRate < 0 && this.isValid;
      },
      isAreasValid() {
        return this.areas.length === 0 && this.isValid;
      },
    },
    methods: {
      onSubmit() {
        const coachData = {
          firstName: this.firstName,
          lastName: this.lastName,
          description: this.desc,
          hourlyRate: this.hourlyRate,
          areas: this.areas,
        };
        if (
          this.firstName === "" ||
          this.lastName === "" ||
          this.desc === "" ||
          this.hourlyRate < 0 ||
          this.areas.length === 0
        ) {
          this.isValid = true;
          return;
        }
        this.$store.dispatch("coaches/addCoach", coachData);
        this.$router.replace("/coaches");
        console.log(this.$store.getters["coaches/isCoach"]);
      },
    },
  };
</script>
<style scoped>
  .form-control {
    display: flex;
    flex-flow: column wrap;
  }
  form h2 {
    margin: 0.5rem 0;
  }
  .form-control label {
    font-weight: bold;
  }
  .form-control input,
  .form-control textarea {
    padding: 0.4rem;
    margin: 0.5rem 0;
    font-size: 1.1rem;
  }
  .form-control input:focus,
  .form-control textarea:focus {
    outline: none;
    border-color: #270041;
    background-color: #edd2ff;
  }
  .areas {
    display: flex;
    flex-wrap: wrap;
    margin: 0 0 1.5rem;
  }
  .area {
    margin-top: 0.5rem;
    margin-right: 1rem;
  }
  .area input {
    cursor: pointer;
  }
  .actions {
    display: flex;
    justify-content: center;
  }
  .invalid input {
    border: 1px solid red;
  }
  .invalid label {
    color: red;
  }
  .invalid textarea {
    border: 1px solid red;
  }
  .invalid .area label {
    color: red;
  }
  .error {
    color: #888;
    margin: 0.5rem 0;
  }
</style>
