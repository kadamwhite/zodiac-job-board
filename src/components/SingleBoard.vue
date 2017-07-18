<template>
  <license-board :licenses="board" />
</template>

<script>
import { jobs } from '../data';
import LicenseBoard from './LicenseBoard';

export default {
  name: 'single-board',
  components: {
    LicenseBoard,
  },
  computed: {
    board() {
      return jobs[this.$route.params.id].board;
    },
  },
};
</script>
