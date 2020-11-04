<template>
  <figure>
    <img
      class="avatar"
      src="https://images.unsplash.com/photo-1590722920075-f5ba5dcebaf8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80"
    />
  </figure>
</template>

<style scoped>
figure {
  position: relative;
  width: 400px;
  margin: 2rem auto;
}
.avatar {
  border-radius: 100%;
  width: 200px;
  height: 200px;
  object-fit: cover;
  box-shadow: 0 2px 4px 0 rgba(100, 100, 100, 0.8);
}
</style>