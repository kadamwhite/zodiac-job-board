<template>
  <ul class="license-categories">
    <li
      v-for="(ids, category) in categories"
      :key="category"
      class="category"
    >
      <h3 class="category-title" v-if="selectedCategory === category">
        {{categoryLabel}}<span>: {{ licenseLabel }}</span>
      </h3>
      <div :class="[
        'licenses',
        { unused: hasNoActiveLicenses(ids) }
      ]">
        <span
          v-for="id in ids"
          :key="`${category}${id}`"
          :class="[
            'license',
            { selected: isSelected(id) },
            { active: isActive(id) },
          ]"
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
  props: {
    active: {
      // Array of licenses that should be considered "active"
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      categories,
      selectedLicense: null,
      selectedCategory: '',
    };
  },
  computed: {
    categoryLabel() {
      return this.selectedCategory;
    },
    licenseLabel() {
      const { name, skills } = this.selectedLicense;
      return skills && skills.length ?
        `${name} (${skills.join(', ')})` :
        name;
    },
  },
  methods: {
    select(category, id) {
      this.selectedCategory = category;
      this.selectedLicense = getLicense(id);
    },
    isSelected(id) {
      return this.selectedLicense === getLicense(id);
    },
    isActive(id) {
      return (this.active || []).includes(id);
    },
    hasNoActiveLicenses(ids) {
      for (let i = 0; i < ids.length; i += 1) {
        if (this.isActive(ids[i])) {
          return false;
        }
      }
      return true;
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
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
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
.licenses.unused {
  height: 0.5em;
}
.license {
  cursor: default;
  display: inline-block;
  vertical-align: top;
  border: 1px solid black;
  border-right: 0;
  height: 1em;
  width: 1em;
  overflow: hidden;
  transition: border-width 200px;
}
.licenses.unused .license {
  height: 0.5em;
}
.license.active {
  background: #555;
}
.license:last-child {
  border-right: 1px solid black;
}
.license.selected {
  margin: -1px -2px -1px -1px;
  border: 2px solid black;
}
</style>
