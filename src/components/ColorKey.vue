<template>
  <div class="color-key">
    <slot />
    <span class="color" v-for="cat in metaCategories" :key="cat">
      <svg width="0.8em" height="0.8em" viewBox="0 0 100 100">
        <rect width="100" height="100" :fill="categoryColor(cat)" />
      </svg> {{cat}}
    </span>
    <span class="color">
      <svg width="0.8em" height="0.8em" viewBox="0 0 100 100">
        <rect width="100" height="100" fill="red" />
      </svg> Ultimate Weapon
    </span>
  </div>
</template>

<script>
import { metaCategories, categoryColor } from '../data/categories';

export default {
  name: 'color-key',
  data() {
    return {
      metaCategories,
    };
  },
  methods: {
    categoryColor: category => categoryColor(category),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
</style>
