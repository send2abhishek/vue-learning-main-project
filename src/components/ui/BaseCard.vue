<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<style scoped>
.card {
  margin: 2rem auto;
  padding: 1rem;
  max-width: 40rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.26);
  border-radius: 12px;
}
</style>