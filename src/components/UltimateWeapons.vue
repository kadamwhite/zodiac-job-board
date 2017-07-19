<template>
  <div>
    <slot />
    <ul v-if="activeLicenses.length">
      <li v-for="weapon in ultimateWeapons" :key="weapon">
        {{weapon}}
      </li>
    </ul>
    <p v-else>Please select one or more jobs</p>
  </div>
</template>

<script>
import { ultimateWeapons } from '../data/categories';

export default {
  name: 'ultimate-weapons',
  props: {
    activeLicenses: {
      default() {
        return [];
      },
    },
  },
  computed: {
    ultimateWeapons() {
      return ultimateWeapons(this.activeLicenses);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
