<template>
  <section>
    <base-dialog :show="!!error" title="An error occured!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <base-dialog fixed :show="isLoading" title="Authntecating...">
      <base-spinner></base-spinner>
    </base-dialog>
    <base-card>
      <form @submit.prevent="onSubmit">
        <div class="form-control" :class="{ errors: !isValid }">
          <label for="email">E-mail</label>
          <input type="text" id="email" v-model.trim="email" />
        </div>
        <div class="form-control" :class="{ errors: !isValid }">
          <label for="password">password</label>
          <input type="password" id="password" v-model="password" />
        </div>
        <span class="error" v-if="!isValid"
          >please enter a valid email and password (password must be 6
          characters or more)</span
        >
        <div class="actions">
          <base-button>{{ submitButtonCaption }}</base-button>
          <base-button mode="flat" type="button" @click="switchMode">{{
            switchButtonCaption
          }}</base-button>
        </div>
      </form>
    </base-card>
  </section>
</template>
<script>
  export default {
    data() {
      return {
        email: "",
        password: null,
        isValid: true,
        mode: "login",
        error: null,
        isLoading: false,
      };
    },
    computed: {
      submitButtonCaption() {
        return this.mode;
      },
      switchButtonCaption() {
        if (this.mode === "login") {
          return "signUp Instead";
        } else {
          return "login Instead";
        }
      },
    },
    methods: {
      async onSubmit() {
        this.isValid = true;
        if (
          this.email === "" ||
          !this.email.includes("@") ||
          this.password.length < 6
        ) {
          this.isValid = false;
          return;
        }
        this.isLoading = true;
        const actionPayload = {
          email: this.email,
          password: this.password,
        };
        try {
          if (this.mode === "login") {
            await this.$store.dispatch("login", actionPayload);
          } else {
            await this.$store.dispatch("signup", actionPayload);
          }
          const redirectUrl = "/" + (this.$route.query.redirect || "coaches");
          this.$router.replace(redirectUrl);
        } catch (err) {
          this.error = err.message || "Failed to Authnticate, try again later.";
        }
        console.log(this.error);
        this.isLoading = false;
      },
      switchMode() {
        if (this.mode === "login") {
          this.mode = "signup";
        } else {
          this.mode = "login";
        }
      },
      handleError() {
        this.error = null;
      },
    },
  };
</script>
<style scoped>
  form {
    margin: 1rem;
    padding: 1rem;
  }

  .form-control {
    margin: 0.5rem 0;
  }
  button {
    text-transform: capitalize;
  }

  label {
    font-weight: bold;
    margin-bottom: 0.5rem;
    display: block;
  }

  input {
    display: block;
    width: 100%;
    font: inherit;
    border: 1px solid #ccc;
    padding: 0.35rem;
  }

  input:focus {
    border-color: #3d008d;
    background-color: #faf6ff;
    outline: none;
  }

  .errors label {
    font-weight: bold;
    color: red;
  }
  .errors input {
    border-color: red;
  }

  .actions {
    text-align: center;
    margin-top: 1.5rem;
  }
  .error {
    color: #888;
    margin: 0.5rem 0;
  }
</style>
