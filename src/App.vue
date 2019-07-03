<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Raleway:400,700');
@import url('https://fonts.googleapis.com/css?family=Barlow+Condensed:400,700&display=swap');

body {
  color: white;
  background: black;
  padding: 1rem;
  font-size: 1rem;
  @media screen and (min-width: 480px) {
    padding: 2rem;
    font-size: 1.25rem;
  }
}
#app {
  max-width: 1600px;
  margin: 0 auto;
  font-family: Raleway, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1, h2, h3, h4, h5, h6 {
  font-weight: bold;
}
</style>
