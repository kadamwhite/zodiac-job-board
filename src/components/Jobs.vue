<template>
  <div class="jobs">
    <h1>Job Boards</h1>
    <div v-for="job in jobs" :key="job.name">
      <h2>{{job.name}}</h2>
      <license-board :licenses="job.board" />
    </div>
  </div>
</template>

<script>
import { jobs } from '../data';
import LicenseBoard from './LicenseBoard';

// eslint-disable-next-line
// console.log(jobs);

export default {
  name: 'jobs',
  components: {
    'license-board': LicenseBoard,
  },
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