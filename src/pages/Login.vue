<template>
  <div class="login">
    <div>
      <form @submit.prevent="submit">
        <div>
          <label name="username">Username:</label>
          <input @keypress="isSpaceSpecialNotAllowed($event)" type="text" name="username" v-model="form.username" />
        </div>
        <div>
          <label name="password">Password:</label>
          <input @keypress="isSpaceSpecialNotAllowed($event)" type="password" name="password" v-model="form.password" />
        </div>
        <button type="submit" class="btn btn-primary">Login</button>
      </form>
      <p v-if="showError" id="error">Username or Password is incorrect.</p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Login",
  components: {},
  data() {
    return {
      form: {
        username: null,
        password: null
      },
      user: null,
      showError: false
    };
  },
  computed: {
    ...mapGetters({ userList: "StateUserList" }),
  },
  methods: {
    ...mapActions(["LogIn"]),
    isSpaceSpecialNotAllowed: function (event) {
      if(!((event.keyCode >= 65) && (event.keyCode <= 90) || (event.keyCode >= 97) && (event.keyCode <= 122) || (event.keyCode >= 48) && (event.keyCode <= 57))){
        event.preventDefault()
        return false
      }
    },
    submit() {
      const { username, password } = this.form
      let userList = this.userList
      //Check if User is existing.
      const index = userList.findIndex(obj => {
        obj.username === username ? this.user = obj : ''
        return obj.username === username
      })
      if (index !== -1) {
        if(this.user.password === password) {
          this.LogIn(this.form);
          this.$router.push("/car-parking");
        } else 
          this.showError = true
      } else {
        username === null ? alert('Please enter your account.') : alert('User does not exist.')
      }
        
    },
  },
};
</script>

<style scoped>
.login {
  text-align: center;
}

label {
  padding: 12px 12px 12px 0;
  display: inline-block;
}

input {
  margin: 5px;
  box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.06);
  padding: 10px;
  border-radius: 30px;
}

#error {
  margin-top: 5px;
  color: red;
}
</style>
