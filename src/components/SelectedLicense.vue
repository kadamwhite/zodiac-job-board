<template>
  <p class="selected-license">
    <template v-if="selectedCategory">
      <strong>{{ selectedCategory }}:</strong> {{ licenseLabel }}
    </template>
    <template v-else>&nbsp;</template>
  </p>
</template>

<script>
import { getCategory } from '../data/categories';
import { getLicense } from '../data';

export default {
  name: 'selected-license',
  props: {
    id: {
      type: Number,
    },
  },
  computed: {
    selectedCategory() {
      return getCategory(this.id);
    },
    licenseLabel() {
      if (!this.id && this.id !== 0) {
        return '';
      }
      const { name, skills } = getLicense(this.id);
      return skills && skills.length ?
        `${ name } (${ skills.join(', ') })` :
        name;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.selected-license {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
}
</style>
