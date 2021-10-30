<template>
  <section>
    <form @submit.prevent="submitFormData">
      <div class="form-control" :class="{ invalid: !firstName.isValid }">
        <label id="firstname">First Name</label>
        <input
          type="text"
          id="firstname"
          v-model.trim="firstName.val"
          @blur="clearValidity('firstName')"
        />
        <p v-if="!firstName.isValid">First name can't be empty</p>
      </div>
      <div class="form-control" :class="{ invalid: !lastName.isValid }">
        <label id="lastname">Last Name</label>
        <input
          type="text"
          id="lastname"
          v-model.trim="lastName.val"
          @blur="clearValidity('lastName')"
        />
        <p v-if="!lastName.isValid">Last name can't be empty</p>
      </div>
      <div class="form-control" :class="{ invalid: !description.isValid }">
        <label id="description">Description</label>
        <textarea
          id="description"
          rows="5"
          v-model.trim="description.val"
          @blur="clearValidity('description')"
        />
        <p v-if="!description.isValid">Description can't be empty</p>
      </div>
      <div class="form-control" :class="{ invalid: !rate.isValid }">
        <label id="rate">Rate</label>
        <input
          type="number"
          id="rate"
          v-model.number="rate.val"
          @blur="clearValidity('rate')"
        />
        <p v-if="!rate.isValid">
          Rate can't be empty or must be greater than zero
        </p>
      </div>

      <div class="form-control" :class="{ invalid: !area.isValid }">
        <h3>Area of Expertise</h3>
        <div>
          <input
            type="checkbox"
            id="frontend"
            value="frontend"
            v-model="area.val"
            @blur="clearValidity('area')"
          />
          <label for="frontend">Frontend Development</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="backend"
            value="backend"
            v-model="area.val"
            @blur="clearValidity('area')"
          />
          <label for="backend">Backend Development</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="career"
            value="career"
            v-model="area.val"
            @blur="clearValidity('area')"
          />
          <label for="career">Carrer Advisory</label>
        </div>
        <p v-if="!area.isValid">Area must be selected at least one or more</p>
      </div>
      <p v-if="!formIsValid">Please fix the error above and submit again !</p>
      <base-button>Register</base-button>
    </form>
  </section>
</template>

<script>
export default {
  emits: ['save-data'],
  data() {
    return {
      firstName: {
        isValid: true,
        val: '',
      },
      lastName: {
        isValid: true,
        val: '',
      },
      description: {
        isValid: true,
        val: '',
      },
      rate: {
        isValid: true,
        val: 0,
      },
      area: {
        isValid: true,
        val: [],
      },
      formIsValid: true,
    };
  },
  methods: {
    clearValidity(input) {
      this[input].isValid = true;
    },
    validateFormData() {
      this.formIsValid = true;

      if (this.firstName.val === '') {
        this.firstName.isValid = false;
        this.formIsValid = false;
      }
      if (this.lastName.val === '') {
        this.lastName.isValid = false;
        this.formIsValid = false;
      }
      if (this.description.val === '') {
        this.description.isValid = false;
        this.formIsValid = false;
      }
      if (this.rate.val && this.rate.val < 0) {
        this.rate.isValid = false;
        this.formIsValid = false;
      }
      if (this.area.val.length === 0) {
        this.area.isValid = false;
        this.formIsValid = false;
      }
    },
    submitFormData() {
      this.validateFormData();
      if (this.formIsValid) {
        const formData = {
          firstName: this.firstName.val,
          lastName: this.lastName.val,
          desc: this.description.val,
          rate: this.rate.val,
          area: this.area.val,
        };
        this.$emit('save-data', formData);
      }
    },
  },
};
</script>

<style  scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>