<template>
  <div
    class="modal modal-md fade"
    id="parkModal"
    tabindex="-1"
    role="dialog"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-bold">{{ modalTitle }}</h5>
          <a id="close" data-bs-dismiss="modal" aria-label="Close">
            <span @click="resetForm" class="close">&times;</span>
          </a>
        </div>
        <div class="modal-body">
          <form @submit.stop.prevent="onSubmit">
            <div class="form-group row">
              <label class="col-sm-4 col-form-label">Plate Number:</label>
              <div class="col-sm-8">
                <input
                  @keypress="isSpaceSpecialNotAllowed($event)"
                  id="plateNumber"
                  name="plateNumber"
                  v-model="form.plateNumber"
                  type="text"
                  class="form-control"
                  maxlength="20"
                  required
                >
              </div>
            </div>
            <div v-if="modalTitle === 'Park'" class="form-group row mt-3">
              <label class="col-sm-4 col-form-label">Vehicle Type:</label>
              <div class="col-sm-8">
                <select 
                  name="vehicleType"
                  v-model="form.vehicleType"
                  class="form-select"
                  required
                >
                  <option selected></option>
                  <option value="S">Small</option>
                  <option value="M">Medium</option>
                  <option value="L">Large</option>
                </select>
              </div>
            </div>
            <div v-if="modalTitle === 'Park'" class="form-group row mt-3">
              <label class="col-sm-4 col-form-label">Entrance:</label>
              <div class="col-sm-8">
                <select 
                  name="entrance"
                  v-model="form.entrance"
                  class="form-select"
                  required
                >
                  <option selected></option>
                  <option v-for="e in entrance" :key="e" :value="e">{{ e }}</option>
                </select>
              </div>
            </div>
            <button type="submit" class="btn btn-primary mt-3">Proceed</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modalTitle: { type: String, default: null },
    entrance: { type: Array, default: null }
  },
  data() {
    return {
      form: {
        plateNumber: null,
        vehicleType: null,
        entrance: null
      },
      availabe: null,
      returning: null,
      returningVehicle: null,
      reverse: null
    };
  },
  methods: {
    isSpaceSpecialNotAllowed: function (event) {
      if(!((event.keyCode >= 65) && (event.keyCode <= 90) || (event.keyCode >= 97) && (event.keyCode <= 122) || (event.keyCode >= 48) && (event.keyCode <= 57))){
        event.preventDefault()
        return false
      }
    },
    resetForm() {
      this.form = {
        plateNumber: null,
        vehicleType: null,
        entrance: null
      };
    },
    onSubmit() {
      if(this.modalTitle === 'Park')
        this.park()
      else
        this.unPark()
    },
    park() {
      let searchOrder = []
      this.returning = false
      const { plateNumber, entrance, vehicleType } = this.form
      //Check if Vehicle is already parked.
      const index1 = this.$parent.vehiclesParked.findIndex(obj => {
        return obj.plateNumber === plateNumber && obj.isParked === 'Yes'
      })
      if (index1 !== -1) {
        alert('Vehicle is already parked.')
        return false
      }
      // Check Vechicle must return once only
      const index2 = this.$parent.vehiclesParked.findIndex(obj => {
        return obj.plateNumber === plateNumber && obj.returning === 'Yes'
      })
      if (index2 !== -1) {
        alert('You can only return once.')
        return false
      }
      // Check returning Vechicle within one hour
      this.$parent.vehiclesParked.map(obj => {
        if (obj.plateNumber === this.form.plateNumber) {
          if(((new Date() - new Date(obj.timeOut))/1000) <= 3600) {
            this.returning = true
            this.returningVehicle = obj
          } else
            this.returning = false            
        }
      });
      // Check returning if Vechicle Type if the same in previous
      if (this.returning && this.returningVehicle.vehicleType !== vehicleType) {
        alert(`Returning customer. The vehicle type is invalid. The vehicle type is ${this.vehicleType(this.returningVehicle.vehicleType)}.`)
        return false
      }
      switch(entrance) {
        case 'A':
          searchOrder = [0,1,2]
          break;
        case 'B':
          searchOrder = [1,0,2]
          break;
        case 'C':
          searchOrder = [2,1,0]
          break;
        case 'D':
          searchOrder = [0,1,2]
          break;
        case 'E':
          searchOrder = [1,0,2]
          break;
        case 'F':
          searchOrder = [2,1,0]
          break;
        default:
      }
      const topEntrance = ['A', 'B', 'C'];
      (topEntrance.includes(entrance)) ? this.reverse = false : this.reverse = true
      for (let a = 0; a < searchOrder.length; a++) {
        let park = this.$parent.park[searchOrder[a]]
        for (let i = this.reverse? 9 : 0; i < park.length; this.reverse? i-- : i++) {
          let slot = park[i]
          if(vehicleType === 'S' && (slot.psize.value === 0 || slot.psize.value === 1 || slot.psize.value === 2) && slot.occupied === false) {
            this.$parent.park[searchOrder[a]][i].occupied = true
            this.availabe = true
            if(this.returning) {
              this.$parent.vehiclesParked = this.$parent.vehiclesParked.map(obj => {
                if (obj.plateNumber === this.form.plateNumber) {
                  return {...obj, parkId: slot.id, entrance: entrance, timeOut: null, isParked: 'Yes', returning: 'Yes' }
                }
                return obj
              });
            } else {
              this.$parent.vehiclesParked.push({
                parkId: slot.id,
                plateNumber: plateNumber,
                vehicleType: vehicleType,
                parkSize: slot.psize.value,
                timeIn: new Date(),
                timeOut: null,
                entrance: entrance,
                isParked: 'Yes',
                returning: 'No',
                charges: 0
              })
            }
            this.$parent.AddVehiclesParked(this.$parent.vehiclesParked)
            this.resetForm()
            document.getElementById("close").click()
            return true
          } else {
            this.availabe = false
          }
          if(vehicleType === 'M' && (slot.psize.value === 1 || slot.psize.value === 2) && slot.occupied === false) {
            this.$parent.park[searchOrder[a]][i].occupied = true
            this.availabe = true
            if(this.returning) {
              this.$parent.vehiclesParked = this.$parent.vehiclesParked.map(obj => {
                if (obj.plateNumber === this.form.plateNumber) {
                  return {...obj, parkId: slot.id, entrance: entrance, timeOut: null, isParked: 'Yes', returning: 'Yes' }
                }
                return obj
              });
            } else {
              this.$parent.vehiclesParked.push({
                parkId: slot.id,
                plateNumber: plateNumber,
                vehicleType: vehicleType,
                parkSize: slot.psize.value,
                timeIn: new Date(),
                timeOut: null,
                entrance: entrance,
                isParked: 'Yes',
                returning: 'No',
                charges: 0
              })
            }
            this.$parent.AddVehiclesParked(this.$parent.vehiclesParked)
            this.resetForm()
            document.getElementById("close").click()
            return true
          } else {
            this.availabe = false
          }
          if(vehicleType === 'L' && slot.psize.value === 2 && slot.occupied === false) {
            this.$parent.park[searchOrder[a]][i].occupied = true
            this.availabe = true
            if(this.returning) {
              this.$parent.vehiclesParked = this.$parent.vehiclesParked.map(obj => {
                if (obj.plateNumber === this.form.plateNumber) {
                  return {...obj, parkId: slot.id, entrance: entrance, timeOut: null, isParked: 'Yes', returning: 'Yes' }
                }
                return obj
              });
            } else {
              this.$parent.vehiclesParked.push({
                parkId: slot.id,
                plateNumber: plateNumber,
                vehicleType: vehicleType,
                parkSize: slot.psize.value,
                timeIn: new Date(),
                timeOut: null,
                entrance: entrance,
                isParked: 'Yes',
                returning: 'No',
                charges: 0
              })
            }
            this.$parent.AddVehiclesParked(this.$parent.vehiclesParked)
            this.resetForm()
            document.getElementById("close").click()
            return true
          } else {
            this.availabe = false
          }
        }
      }
      !this.availabe ? alert('No availabe parking.') : ''
    },
    unPark() {
      const data = this.$parent.vehiclesParked.find((obj) => obj.plateNumber === this.form.plateNumber)
      if (data) {
        const diff = new Date() - new Date(data.timeIn)
        const totalPayable = this.compute(data, diff)
        //Check if the Vehicle is already unparked.
        this.$parent.vehiclesParked.map(obj => {
          if ((obj.plateNumber === this.form.plateNumber) && obj.isParked === 'No') {
            alert('The Vehicle is already unparked.')
            return false
          }
        });
        // Remove the marking in Parking Slot
        for (let a = 0; a < 3; a++) {
          let park = this.$parent.park[a]
          for (let i = 0; i < park.length; i++) {
            let slot = park[i]
            slot.id === data.parkId && data.isParked === 'Yes' ? this.$parent.park[a][i].occupied = false : ''
          }
          this.$parent.park[a] = this.$parent.park[a].map(obj => {
            if (obj.id === data.parkId && data.isParked === 'Yes') {
              return {...obj, occupied: false }
            }
            return obj
          });
        }
        this.$parent.GeneratePark(this.$parent.park)
        // Update the status of Parking
        this.$parent.vehiclesParked = this.$parent.vehiclesParked.map(obj => {
          if ((obj.plateNumber === this.form.plateNumber) && obj.isParked === 'Yes') {
            alert(`Total charges: P ${totalPayable}`)
            return {...obj, isParked: 'No', timeOut: new Date(), charges: totalPayable }
          }
          return obj
        });
        this.$parent.AddVehiclesParked(this.$parent.vehiclesParked)
        this.resetForm()
        document.getElementById("close").click()
      } else {
        alert('The vehicle is not parked yet.')
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.modal {
  text-align: center;
  padding: 0 !important;
}

.modal:before {
  content: "";
  display: inline-block;
  height: 100%;
  vertical-align: middle;
}
.modal-dialog {
  width: 100% !important;
  display: inline-block;
  text-align: left;
  vertical-align: middle;
}

.modal-header {
  padding: 0 15px
}

.modal-body {
  padding: 30px
}

/* The Close Button */
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

</style>
