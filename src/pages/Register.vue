<template>
  <div class="register">
    <div>
      <form @submit.prevent="submit">
        <div>
          <label name="username">Username:</label>
          <input @keypress="isSpaceSpecialNotAllowed($event)" type="text" name="username" v-model="form.username" required/>
        </div>
        <div>
          <label name="password">Password:</label>
          <input @keypress="isSpaceSpecialNotAllowed($event)" type="password" name="password" v-model="form.password" required/>
        </div>
        <button type="submit" class="btn btn-primary">Register</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Register",
  components: {},
  data() {
    return {
      form: {
        username: null,
        password: null
      }
    };
  },
  computed: {
    ...mapGetters({ userList: "StateUserList" }),
  },
  methods: {
    ...mapActions(["Register"]),
    isSpaceSpecialNotAllowed: function (event) {
      if(!((event.keyCode >= 65) && (event.keyCode <= 90) || (event.keyCode >= 97) && (event.keyCode <= 122) || (event.keyCode >= 48) && (event.keyCode <= 57))){
        event.preventDefault()
        return false
      }
    },
    resetForm() {
      this.form = {
        username: null,
        password: null
      };
    },
    submit() {
      let userList = this.userList
      //Check if User is existing.
      const index = userList.findIndex(obj => {
        return obj.username === this.form.username
      })
      if (index !== -1) {
        alert('Username is already exists.')
      } else {
        userList.push(this.form)
        this.Register(userList);
        alert('User was successfuly created.')
        this.resetForm()
      }
    },
  },
};
</script>
<style scoped>
.register {
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
</style>
