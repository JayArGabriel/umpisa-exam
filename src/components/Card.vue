<template>
  <div class="card mb-3">
    <img :src="`${hasImage}`"/>
    <div class="card-body">
      <p class="title">
        {{ content.show.name }}
      </p>
      <p class="rating">
        <span v-if="content.show.rating.average">Rating {{ content.show.rating.average }}/10</span><span v-else>No rating yet</span>
      </p>
      <p class="description" v-html="content.show.summary">
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    content: {
      type: Object,
      required: true
    }
  },
  computed: {
    hasImage () {
      try {
        return this.content.show.image.original
      } catch (err) {
        return 'https://via.placeholder.com/600x400?text='
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.card {
  position: relative;
  display: flex;
  flex-direction: row;
  min-width: 0;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
  img {
    position: relative;
    width: 28%;
    margin: 6px;
    border-radius: 6px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    box-shadow: 0px 1px 4px rgba(12, 14, 53, 0.45);
  }
  .card-body {
    flex: 1 1 auto;
    min-height: 1px;
    padding: 1.25rem;
    .title {
      font-weight: bold;
    }
    .rating {
      margin-top: -20px;
    }
    .description {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
