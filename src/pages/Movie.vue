<template>
  <div class="movie">
    <div class="search-cont">
      <input v-model="search" class="search" type="text" name="search" placeholder="Search Movie" />
    </div>
    <div class="searching" v-if="search">Searching for: <b>“{{ search }}”</b></div>
    <div v-if="movies.length !== 0" class="row">
      <div
        v-for="(show, index) in movies"
        :key="`show_${index}`"
        class="col-12 col-md-4"
      >
        <Card :content="show" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import _ from 'lodash';
import Card from '@/components/Card.vue';
export default {
  components: { 
    Card
  },
  data () {
    return {
      search: null,
      movies: [],
    }
  },
  computed: {
    ...mapGetters({ Search: "StateSearch", Movies: "StateMovies" }),
  },
  created() {
    this.search = this.Search
    this.movies = this.Movies
  },
  methods: {
    ...mapActions(["GetMovies"]),
    async fetchResult() {
      await this.GetMovies(this.search)
      this.movies = this.Movies
    },
  },
  watch: {
    search: _.debounce(
      function() {
        let vi = this;
        setTimeout(function(){ vi.fetchResult(); }, 2000);
      },
      800,
      {
        leading: true,
        trailing: true
      }
    )
  }
}
</script>

<style lang="scss">
body {
  min-height: 100vh;
}
.movie {
  margin: 0 20px;
  .search-cont {
    display: flex;
    justify-content: center;
    margin: 20px 0;
    input {
      width: 300px;
    }
  }
  .searching {
    text-align: center;
    margin-bottom: 20px;
  }
}
</style>