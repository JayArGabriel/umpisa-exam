<template>
  <div class="parking">
    <div class="actions">
      <button @click="show('Park')" type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#parkModal">Park</button>
      <button @click="show('Unpark')" type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#parkModal">Unpark</button>
      <button @click="addEntrance" type="button" class="btn btn-secondary">Add Entrance</button>
    </div>
    <div class="parking-slot mb-3">
      <div class="parking-cont">
        <div class="entrance">A</div>
        <div class="slot">
          <Parking v-for="p in park[0]" :key="p.id" :park="p" :selectedVehicle="parkInfo" />
        </div>
        <div v-show="entranceCount > 0" class="entrance">D</div>
      </div>
      <div class="parking-cont">
        <div class="entrance">B</div>
        <div class="slot">
          <Parking v-for="p in park[1]" :key="p.id" :park="p" :selectedVehicle="parkInfo" />
        </div>
        <div v-show="entranceCount > 1" class="entrance">E</div>
      </div>
      <div class="parking-cont">
        <div class="entrance">C</div>
        <div class="slot">
          <Parking v-for="p in park[2]" :key="p.id" :park="p" :selectedVehicle="parkInfo" />
        </div>
        <div v-show="entranceCount > 2" class="entrance">F</div>
      </div>
    </div>
    <div class="parkingInformation">
      <p><b>Parking Information</b></p>
      <p>Plate Number: {{ parkInfo?.plateNumber }}</p>
      <p>Vehicle Type: {{ vehicleType(parkInfo?.vehicleType) }}</p>
      <p>Parking Size: {{ parkingSize(parkInfo?.parkSize) }}</p>
      <p>Entrance: {{ parkInfo?.entrance }}</p>
      <p>Time In:  {{ parkInfo?.timeIn ? new Date(parkInfo?.timeIn).toLocaleString() : '' }}</p>
      <p>Returning:  {{ parkInfo?.returning }}</p>
    </div>
    <Modal :modalTitle="modalTitle" :entrance="entrance" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Parking from "@/components/Slot";
import Modal from "@/components/Modal";
export default {
  components: {
    Modal,
    Parking
  },
  data() {
    return {
      modalTitle: null,
      park: [],
      entranceCount: 0,
      entrance: [],
      vehiclesParked: [],
      parkInfo: null
    }
  },
  computed: {
    ...mapGetters({ 
      Park: "StatePark",
      EntranceCount: "StateEntranceCount",
      Entrance: "StateEntrance",
      VehiclesParked: "StateVehiclesParked",
      ParkInfo: "StateParkInfo",
    })
  },
  created() {
    if(this.Park === null) this.GeneratePark(this.generate())
    this.park = this.Park
    this.entranceCount = this.EntranceCount
    this.entrance = this.Entrance
    this.vehiclesParked = this.VehiclesParked
    this.parkInfo = this.ParkInfo
  },
  methods: {
    ...mapActions([
      "GeneratePark",
      "AddEntranceCount",
      "AddEntrance",
      "AddVehiclesParked",
      "AddParkInfo"
    ]),
    show(action) {
      this.modalTitle = action
      this.parkInfo = null
      this.AddParkInfo(null)
    },
    addEntrance() {
      switch(this.entranceCount) {
        case 0:
          this.entrance.push('D')
          this.AddEntrance(this.entrance)
          break;
        case 1:
          this.entrance.push('E')
          this.AddEntrance(this.entrance)
          break;
        case 2:
          this.entrance.push('F')
          this.AddEntrance(this.entrance)
          break;
        default:
          alert('You have reached the maximum entrance allowed.')
      }
      this.entranceCount++
      this.AddEntranceCount(this.entranceCount)
    }
  }
}
</script>

<style lang="scss" scoped>
.parking {
  max-width: 1080px;
  margin: auto;
  .actions {
    padding: 0 18px 50px 0;
    button {
      margin-right: 10px;
    }
  }
  .parking-slot {
    display: flex;
    justify-content: space-around;
    height: 300px;
    .parking-cont {
      width: 350px;
      .entrance {
        text-align: center;
        text-transform: capitalize;
        background-color: dodgerblue;
        padding: 12px;
        color: #fff;
        width: 40px;
        margin: 0 auto;
        margin-bottom: 20px;
        margin-top: 12px;
      }
      .slot {
        display: flex;
        justify-content: space-evenly;
        flex-wrap: wrap;
      }
    }
  }
  .parkingInformation {
    margin-top: 20px;
    p {
      margin-bottom: 0;
    }
  }
}
</style>
