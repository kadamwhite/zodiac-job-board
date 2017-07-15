<template>
  <div class="job">
    <h2>{{name}}</h2>
    <div class="board">
      <license-board :licenses="board" />
    </div>
    <license-categories :active="jobLicenseIDs" />
  </div>
</template>

<script>
import LicenseBoard from './LicenseBoard';
import LicenseCategories from './LicenseCategories';

export default {
  name: 'job',
  components: {
    'license-board': LicenseBoard,
    'license-categories': LicenseCategories,
  },
  props: [
    // String name of the job
    'name',
    // Dictionary of cells to their corresponding license object
    'board',
  ],
  computed: {
    jobLicenseIDs() {
      return Object.keys(this.board).map(cell => this.board[cell]);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.job {
  margin-bottom: 2em;
  clear: both;
  overflow: hidden;
}
h2 {
  text-align: left;
}
.board {
  /* float: left; */
  margin-right: 2em;
}
</style>
