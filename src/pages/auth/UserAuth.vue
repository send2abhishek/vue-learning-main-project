<template>
  <section>
    <base-dialog :show="!!error" title="An error occurred" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <base-card>
      <div v-if="isLoading">
        <base-spinner></base-spinner>
      </div>
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="email">E-Mail</label>
          <input type="email" id="email" v-model.trim="email" />
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <input type="password" id="password" v-model.trim="password" />
        </div>
        <p v-if="!formIsValid">Please enter valid email and password</p>
        <base-button>{{ submitButtonCaption }}</base-button>
        <base-button type="button" mode="flat" @click="switchAuthMode">{{
          switchButtonCaption
        }}</base-button>
      </form>
    </base-card>
  </section>
</template>


<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      formIsValid: true,
      authMode: 'login',
      isLoading: false,
      error: null,
    };
  },
  computed: {
    submitButtonCaption() {
      if (this.authMode === 'login') {
        return 'Login';
      } else {
        return 'Signup';
      }
    },
    switchButtonCaption() {
      if (this.authMode === 'login') {
        return 'Signup Instead';
      } else {
        return 'Login Instead';
      }
    },
  },
  methods: {
    async submitForm() {
      this.formIsValid = true;
      if (this.email === '' || this.password === '') {
        this.formIsValid = false;
      }
      this.isLoading = true;
      try {
        if (this.authMode === 'login') {
          await this.$store.dispatch('login', {
            email: this.email,
            password: this.password,
          });
        } else {
          await this.$store.dispatch('signUp', {
            email: this.email,
            password: this.password,
          });
        }
        const redirectUrl = '/' + (this.$route.query.redirect || 'coaches');
        this.$router.replace(redirectUrl);
      } catch (error) {
        this.error = error.message || 'something went wrong';
      }
      this.isLoading = false;
    },
    switchAuthMode() {
      if (this.authMode === 'login') {
        this.authMode = 'signup';
      } else {
        this.authMode = 'login';
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
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
</style>