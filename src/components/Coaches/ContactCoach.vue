<template>
  <section v-if="!isMessageSent">
    <form @submit.prevent="onSubmit">
      <div class="form-control">
        <label for="email" :class="{ errors: isValid && isEmailValid }"
          >E-mail</label
        >
        <input type="text" id="email" v-model.trim="email" />
        <span class="error" v-if="isEmailValid && isValid"
          >Please Enter your e-mail address
        </span>
      </div>
      <div class="form-control">
        <label :class="{ errors: isValid && isMessageValid }" for="message"
          >Message</label
        >
        <textarea
          id="message"
          cols="30"
          rows="3"
          v-model.trim="message"
        ></textarea>
        <span class="error" v-if="isMessageValid && isValid"
          >Please Enter your message!
        </span>
      </div>
      <div class="actions">
        <base-button>Send Message</base-button>
      </div>
    </form>
  </section>
  <base-card v-else>
    Your message has been sent!
  </base-card>
</template>
<script>
  export default {
    data() {
      return {
        isValid: false,
        email: "",
        message: "",
        isMessageSent: false,
      };
    },
    methods: {
      onSubmit() {
        this.isValid = false;
        if (
          this.email === "" ||
          !this.email.includes("@") ||
          this.message === ""
        ) {
          this.isValid = true;
          return;
        }
        const request = {
          email: this.email,
          message: this.message,
          id: this.$route.params.id,
        };
        this.$store.dispatch("requests/addRequest", request);
        this.isMessageSent = true;
      },
    },
    computed: {
      isEmailValid() {
        return this.email === "" || !this.email.includes("@");
      },
      isMessageValid() {
        return this.message === "";
      },
    },
  };
</script>
<style scoped>
  form {
    margin: 1rem;
    border: 1px solid #ccc;
    border-radius: 12px;
    padding: 1rem;
  }

  .form-control {
    margin: 0.5rem 0;
  }

  label {
    font-weight: bold;
    margin-bottom: 0.5rem;
    display: block;
  }

  input,
  textarea {
    display: block;
    width: 100%;
    font: inherit;
    border: 1px solid #ccc;
    padding: 0.35rem;
  }

  input:focus,
  textarea:focus {
    border-color: #3d008d;
    background-color: #faf6ff;
    outline: none;
  }

  .errors {
    font-weight: bold;
    color: red;
  }

  .actions {
    text-align: center;
  }
  .error {
    color: #888;
    margin: 0.5rem 0;
  }
</style>
