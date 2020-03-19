<template>
  <v-app>
    <v-content>
      <MameTan/>
    </v-content>
  </v-app>
</template>

<script>
import MameTan from './components/MameTan';

export default {
  name: 'App',

  components: {
    MameTan,
  },

  data: () => ({
    //
  }),
};
</script>
