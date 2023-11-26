'use strict'

const global = {
  methods: {
    generate() {
      const mr = 3;
      const mc = 10;
      const park = new Array(mr).fill(null).map(() => new Array(mc).fill(null));
      return this.generatePark(park)
    },
    generatePark(park) {
      const MAX_COLS = 10;
      const MAX_ROWS = 3;
      let parkCopy = park;
      for (let i = 0; i < MAX_ROWS; i++) {
        for (let j = 0; j < MAX_COLS; j++) {
          parkCopy[i][j] = {
            id: this.getRandomString(10),
            occupied: false,
            psize: this.getRandomSize()
          };
        }
      }
      return parkCopy;
    },
    getRandomString(length) {
      let result = '';
      const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    },
    getRandomSize() {
      // SP = 0, MP = 1, LP = 2
      const max = 2;
      const min = 0;
      const descriptors = ['SP', 'MP', 'LP'];
      const size = Math.round(Math.random() * (max - min) + min);
      const desc = descriptors[size];
      return {
        value: size,
        desc: desc,
      };
    },
    vehicleType(val) {
      let type = ''
      switch(val) {
        case 'S':
          type = 'Small'
          break;
        case 'M':
          type = 'Medium'
          break;
        case 'L':
          type = 'Large'
          break;
        default:
      }
      return type
    },
    parkingSize(val) {
      let size = ''
      switch(val) {
        case 0:
          size = 'Small Parking'
          break;
        case 1:
          size = 'Medium Parking'
          break;
        case 2:
          size = 'Large Parking'
          break;
        default:
      }
      return size
    },
    // Compute total charges based on parking size and total time parked
    compute(data, totalTime) {
      let remainingTime = totalTime/1000;
      let t24 = 60 * 60 * 24;
      let t1h = 60 * 60;
      let charges = 0;
      let hourlyCharge = 0;
      let parkSize = data.parkSize

      if (parkSize === 0) {
        hourlyCharge = 20;
      } else if (parkSize === 1) {
        hourlyCharge = 60;
      } else if (parkSize === 2) {
        hourlyCharge = 100;
      }

      // First 3 hours has a flat rate of 40
      if (remainingTime <= t1h * 3) {
        charges = 40;
      }

      // For parking that exceeds 24 hours, every full 24 hour chunk is charged 5,000 pesos regardless of parking slot.
      if (remainingTime > t24) {
        let n24 = parseInt(remainingTime / t24);
        charges += n24 * 5000;
        remainingTime -= n24 * t24;

        //The remainder hours are charged using the method explained in (b).
        //Parking fees are calculated using the rounding up method, e.g., 6.5 hours must be rounded to 7.
        if (remainingTime > 0) {
          let remainingHours = Math.ceil(remainingTime / t1h);
          charges += remainingHours * hourlyCharge;
        }
      } else {
        // The exceeding hourly rate beyond the initial three (3) hours will be charged as follows:
        // - 20/hour for vehicles parked in SP;
        // - 60/hour for vehicles parked in MP; and
        // - 100/hour for vehicles parked in LP
        if (remainingTime > t1h * 3) {
          remainingTime -= t1h * 3
          let remainingHours = Math.ceil(remainingTime / t1h);
          charges = 40 + (remainingHours * hourlyCharge);
        }
      }

      //Returning Vehicle within 1 hour minus the first charge
      if(data.returning === 'Yes') {
        charges -= data.charges
      }

      // return total charges
      return charges;
    }
  }
}

export default global
