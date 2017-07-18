<template>
  <div class="jobs">
    <h1>Job Boards</h1>
    <div class="job-select">
      <div class="checklist">
        <h2>Select Jobs</h2>
        <div v-for="job in jobs" :key="job.name">
          <input type="checkbox" :id="job.name" :value="job.name" v-model="checkedNames">
          <label :for="job.name">{{ job.name }}</label>
        </div>
      </div>
      <div class="checklist">
        <h2>Accessible Ultimate Weapons</h2>
        <ul v-if="activeLicenses.length">
          <li v-for="weapon in ultimateWeapons" :key="weapon">
            {{weapon}}
          </li>
        </ul>
        <p v-else>Please select one or more jobs</p>
      </div>
    </div>
    <div class="categories">
      <h2>License Access {{(accessibleLicensePct * 100).toFixed(2)}}%</h2>
      <license-categories :active="activeLicenses" />
    </div><!--
    --><div class="boards">
      <div class="color-key">
        <span v-for="cat in metaCategories" :key="cat">
          <svg width="0.8em" height="0.8em" viewBox="0 0 100 100">
            <rect width="100" height="100" :fill="categoryColor(cat)" />
          </svg> {{cat}}
        </span>
        <span>
          <svg width="1em" height="1em" viewBox="0 0 100 100">
            <rect width="100" height="100" fill="red" />
          </svg> Ultimate Weapon
        </span>
      </div>
      <div
        v-for="job in jobs"
        :key="job.name"
        v-if="checkedNames.includes(job.name) || checkedNames.length === 0"
        class="job"
      >
        <h2>{{ job.name }}</h2>
        <license-board :licenses="job.board" />
      </div>
    </div>
  </div>
</template>

<script>
import uniq from 'lodash.uniq';
import { jobs, licenses } from '../data';
import { ultimateWeapons, metaCategories, categoryColor } from '../data/categories';
import LicenseBoard from './LicenseBoard';
import LicenseCategories from './LicenseCategoriesHorizontal';

export default {
  name: 'jobs',
  components: {
    'license-board': LicenseBoard,
    'license-categories': LicenseCategories,
  },
  data() {
    return {
      checkedNames: [],
      metaCategories,
      jobs,
    };
  },
  computed: {
    activeLicenses() {
      return uniq(jobs
        .filter(job => this.checkedNames.includes(job.name))
        .reduce((ids, job) => ids.concat(Object.values(job.board)), []));
    },
    accessibleLicensePct() {
      return this.activeLicenses.length / licenses.length;
    },
    ultimateWeapons() {
      return ultimateWeapons(this.activeLicenses);
    },
  },
  methods: {
    categoryColor: category => categoryColor(category),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

.job-select {
  text-align: left;
}
.checklist {
  display: inline-block;
  vertical-align: top;
  padding-right: 3em;
}

.color-key {
  text-align: left;
}
.color-key svg {
  border: 1px solid black;
}

.categories,
.boards {
  display: inline-block;
  vertical-align: top;
}
.categories {
  width: 33%;
}
.boards {
  width: 66%;
}

.job {
  display: inline-block;
  width: 100%;
}
@media (min-width: 620px) {
  .job { max-width: 50%; }
}

a {
  color: #42b983;
}
</style>
