<template>
  <div @click="parkInfo(park)" :id="park.id" class="slot"  :class="[park.occupied === true ? 'occupied' : '', selectedVehicle?.parkId === park.id ? 'active' : '']">
    <div class="desc">
      <p class="type">{{ park.psize.desc }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    park: {
      type: Object,
      default: () => null
    },
    selectedVehicle: {
      type: Object,
      default: () => null
    }
  },
  methods: {
    parkInfo(park) {
      if(park.occupied) {
        const data = this.$parent.vehiclesParked.find((obj) => obj.parkId === park.id && obj.isParked === 'Yes')
        this.$parent.parkInfo = data
        this.$parent.AddParkInfo(data)
      }
    }
  }
};
</script>

<style lang="scss" scoped>
  .slot {
    width: 50px;
    height: 70px;
    margin-left: 10px;
    margin-bottom: 10px;
    border-radius: 0.4rem;
    background: #90EE90;
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    .desc {
      margin-top: 15px;
    }
  }
  .slot::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.4rem;
    background: transparent;
  }
  .occupied {
    background-color: rgba(200, 200, 200, 0.5);
    cursor: pointer;
  }
  .active {
    border: 2px solid
  }
</style>
