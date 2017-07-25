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
        :frozen="frozen"
        @select="onSelect"
      >
        <button class="unfreeze" v-if="frozen" @click="unfreeze">&times;</button>
      </license-categories>
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
          :frozen="frozen"
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
      frozen: false,
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
    onSelect(id, freeze) {
      this.selectedId = id;
      console.log(id, freeze);
      if (freeze) {
        this.frozen = true;
      }
    },
    unfreeze() {
      this.frozen = false;
    },
    onKeyUp(event) {
      // escape key
      if (event.keyCode == 27) {
        this.unfreeze();
      }
    },
  },
  mounted() {
    this.onKeyUp = this.onKeyUp.bind(this);
    window.addEventListener('keyup', this.onKeyUp);
  },
  beforeDestroy() {
    window.removeEventListener('keyup', this.onKeyUp);
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

.unfreeze {
  float: left;
  margin-right: 1em;
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

.boards {
  max-height: 100vh;
  overflow: scroll;
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
