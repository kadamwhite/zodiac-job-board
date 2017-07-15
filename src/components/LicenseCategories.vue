<template>
  <ul class="license-categories">
    <li
      v-for="(ids, category) in categories"
      :key="category"
      class="category"
    >
      <h3 class="category-title" v-if="selectedCategory === category">
        {{selectedCategory}}<span v-if="selectedLicense">:
          {{ selectedLicense.name }}
          <template v-if="selectedLicense.skills">
            ({{ selectedLicense.skills.join(', ') }})
          </template>
        </span>
      </h3>
      <div class="licenses">
        <span
          v-for="id in ids"
          :key="`${category}${id}`"
          :class="['license', { selected: selectedLicense === license(id) }]"
          @mouseover="select(category, id)"
        />
      </div>
    </li>
  </ul>
</template>

<script>
import categories from '../data/categories';
import { getLicense } from '../data';


export default {
  name: 'license-categories',
  data() {
    return {
      categories,
      selectedLicense: null,
      selectedCategory: '',
    };
  },
  methods: {
    license: id => getLicense(id),
    select(category, id) {
      this.selectedCategory = category;
      this.selectedLicense = getLicense(id);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

ul {
  text-align: left;
  padding-left: 0;
  list-style-type: none;
}
.category {
  position: relative;
  font-size: 0.8em;
  margin-top: 0;
  padding-bottom: 0.5em;
}
.category-title {
  pointer-events: none;
  display: inline-block;
  transition: opacity 300ms;
  position: absolute;
  box-sizing: border-box;
  padding: 2px 5px 1px 5px;
  height: 1.5em;
  margin: -1.5em 0 0 0;
  border: 1px solid black;
  border-bottom: 1px solid white;
  border-radius: 2px 2px 0 0;
  /* background: rgba(255,255,255,0.1); */
  background: white;
  font-size: 1em;
  font-weight: bold;
  text-shadow: -1px 1px #fff, 0 1px #fff, 1px 1px #fff,
    -2px 2px #fff, 0 2px #fff, 2px 2px #fff,
    -3px 3px #fff, 0 3px #fff, 3px 3px #fff;
}
.category-title span {
  font-weight: normal;
}
.licenses {
  display: block;
  height: 1em;
}
.license {
  cursor: default;
  display: inline-block;
  border: 1px solid black;
  border-right: 0;
  height: 1em;
  width: 1em;
  overflow: hidden;
  transition: border-width 200px;
}
.license:last-child {
  border-right: 1px solid black;
}
.license.selected {
  margin: -1px -2px -1px -1px;
  border: 2px solid black;
}
</style>
