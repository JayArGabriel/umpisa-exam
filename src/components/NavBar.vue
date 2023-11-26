<template>
  <div id="nav">
    <router-link to="/car-parking">Car Parking</router-link> |
    <router-link to="/movie-searching">Movie Searching</router-link> |
    <span v-if="isLoggedIn">
      <a @click="logout">Logout</a>
    </span>
    <span v-else>
      <router-link to="/register">Register</router-link> |
      <router-link to="/">Login</router-link>
    </span>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isAuthenticated;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("LogOut");
      this.$router.push("/");
    },
  },
};
</script>

<style>
#nav {
  padding: 30px;
  text-align: center;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

a:hover {
  cursor: pointer;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
