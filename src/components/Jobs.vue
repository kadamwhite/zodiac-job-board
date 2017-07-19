<template>
  <div class="jobs">
    <h1>Job Boards</h1>
    <div class="job-select">
      <div class="checklist">
        <h2>Select Jobs</h2>
        <div v-for="(job, id) in jobs" :key="job.name">
          <input type="checkbox" :id="job.name" :value="id" v-model="checkedNames">
          <label :for="job.name">{{ job.name }}</label>
        </div>
      </div>

      <div class="checklist">
        <h2>Select Espers</h2>
        <div v-for="summon in summons" :key="summon.name">
          <input type="checkbox" :id="`summon${summon.name}`" :value="summon.id" v-model="checkedSummons">
          <label :for="`summon${summon.name}`">{{ summon.name }}</label>
        </div>
      </div>

      <ultimate-weapons class="checklist" :activeLicenses="activeLicenses">
        <h2>Accessible Ultimate Weapons</h2>
      </ultimate-weapons>

      <color-key class="checklist">
        <h2>Color Key</h2>
      </color-key>
    </div>

    <div class="categories">
      <h2>License Access {{(accessibleLicensePct * 100).toFixed(2)}}%</h2>
      <license-categories
        :active="activeLicenses"
        :selectedId="selectedId"
        @select="onSelect"
      />
    </div><!--
    --><div class="boards">
      <div
        v-for="(job, id) in jobs"
        :key="job.name"
        v-if="checkedNames.includes(id) || checkedNames.length === 0"
        class="job"
      >
        <h2>{{ job.name }}</h2>
        <license-board
          :licenses="job.board"
          :unlocks="checkedSummons"
          :selectedId="selectedId"
          @select="onSelect"
        />
      </div>
    </div>
  </div>
</template>

<script>
import uniq from 'lodash.uniq';
import { jobs, summons, licenses } from '../data';
import { ultimateWeapons } from '../data/categories';
import LicenseBoard from './LicenseBoard';
import LicenseCategories from './LicenseCategoriesHorizontal';
import ColorKey from './ColorKey';
import UltimateWeapons from './UltimateWeapons';

export default {
  name: 'jobs',
  components: {
    LicenseBoard,
    LicenseCategories,
    ColorKey,
    UltimateWeapons,
  },
  data() {
    return {
      checkedNames: [],
      checkedSummons: [],
      selectedId: null,
      summons,
      jobs,
    };
  },
  computed: {
    activeLicenses() {
      return uniq(this.checkedNames
        .map(id => jobs[id])
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
    onSelect(id) {
      this.selectedId = id;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2, h3 {
  font-weight: normal;
}

.job-select {
  text-align: left;
}
.checklist {
  display: inline-block;
  vertical-align: top;
  max-width: 25%;
  padding-right: 3em;
}

.color-key {
  text-align: left;
}
.color-key svg {
  border: 1px solid black;
}
.color {
  display: block;
  white-space: nowrap;
}

.categories,
.boards {
  width: 100%;
  display: inline-block;
  vertical-align: top;
}
@media (min-width: 768px) {
  .categories { width: 33%; }
  .boards { width: 66%; }
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
