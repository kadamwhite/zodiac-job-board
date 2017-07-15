<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>License Categories</h2>
    <license-categories />
    <h2>License Boards</h2>
    <jobs />
  </div>
</template>

<script>
import Jobs from './Jobs';
import LicenseCategories from './LicenseCategories';

export default {
  name: 'hello',
  components: {
    jobs: Jobs,
    'license-categories': LicenseCategories,
  },
  data() {
    return {
      msg: 'Zodiac Job System!',
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
