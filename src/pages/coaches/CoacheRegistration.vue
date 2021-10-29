<template>
  <section>
    <base-card>
      <h2>Coach Registration</h2>
      <coach-form @save-data="saveFormData"></coach-form>
    </base-card>
  </section>
</template>

<script>
import CoachForm from '@/components/coaches/CoachForm.vue';
export default {
  components: {
    CoachForm,
  },

  methods: {
    saveFormData(formData) {
      this.$store.dispatch('coaches/registerCoach', formData);
      this.$router.push({ name: 'coaches' });
    },
  },
};
</script>