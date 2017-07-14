<template>
  <ul class="jobs">
    <li v-for="job in jobs">
      {{ job }}
    </li>
  </ul>
</template>

<script>
import licenses from '../data/licenses';

// eslint-disable-next-line
console.log(licenses);
const jobs = [
  'White Mage',
  'Uhlan',
  'Machinist',
  'Red Battlemage',
  'Knight',
  'Monk',
  'Time Battlemage',
  'Foebreaker',
  'Archer',
  'Black Mage',
  'Bushi',
  'Shikari',
];

export default {
  name: 'jobs',
  data() {
    return {
      jobs,
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
