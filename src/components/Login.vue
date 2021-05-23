<template>
  <div id="login-container">
    <div class="login-box">
      <div class="left"></div>
      <div class="right">
        <div class="form">
          <p>Sign In</p>
          <div class="user-input input-1">
            <label for="user-name">email</label>
            <input
              type="text"
              id="user-name"
              autocomplete="off"
              v-model="email"
              @keyup.enter="signIn"
            >
          </div>

          <div class="user-input input-2">
            <label for="user-password">password</label>
            <input
              type="password"
              id="user-password"
              autocomplete="off"
              v-model="password"
              @keyup.enter="signIn"
            >
          </div>
          <button
            id="sign-in"
            @click="signIn"
          >
            Sign In</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import global from '../js/global'
export default {
  name: "login",
  props: ["hello"],
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    signIn() {
      if(this.email === '' || this.password === '') {
        window.alert("邮箱和密码不能为空");
        return;
      }
      let body = {
        email: this.email,
        password: this.password,
        timestamp: Date.now()
      }
      let url = `${global.server}/login`;
      fetch(url, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(body),
        headers: {
          "Content-type": "application/json"
        }
      }).then(response => response.json())
        .then(data => {
          console.log(data);
          this.email = this.password = '';
          if(data.code === 200) {
            // 跳转路由
            this.$router.go(-1);
          } else {
            window.alert(data.msg);
          }
        });
    }
  }

}
</script>

<style scoped>
#login-container {
  height: 100%;
  background-color: #eaadb6;
  position: relative;
}

.login-box {
  /*border: 1px solid red;*/
  position: relative;
  width: 70%;
  height: 80%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: row;
}

.left {
  height: 100%;
  width: 40%;
  background: url("../../static/imgs/login-back.png") no-repeat;
  background-size: cover;
}

.right {
  height: 100%;
  width: 60%;
  background-color: #ffebeb;
}

.form {
  padding: 20px 90px;
  display: flex;
  height: 90%;
  flex-direction: column;
  justify-content: space-evenly;
}

.form > p {
  font-size: 3rem;
  margin-top: 0;
}

.form > div > label {
  color: #b5a5a5;
  font-weight: bold;
  transform: scale(0.7) translateX(-21%);
}

.user-input * {
  display: block;
  width: 100%;
}
#user-password,
#user-name {
  border: none;
  margin: 0;
  height: 30px;
  outline: none;
  box-shadow: 2px 2px 1px #d5cccc;
  padding: 0 0 0 5px;
  box-sizing: border-box;

}

#sign-in {
  width: 100px;
  height: 30px;
  align-self: center;
  border-radius: 15px;
  border: none;
  background-color: darkgrey;
  color: aliceblue;
  cursor: pointer;
  font-weight: bold;
  transition: .5s ease-in-out;
}
#sign-in:hover {
  background-color: #eaadb6;
  color: black;
}
</style>
