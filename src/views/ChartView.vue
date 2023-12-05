<template>
  <div class="chart-container pt-5 d-flex justify-content-center">
    <ChartComponent :chartData="chartData"/>
  </div>
</template>

<script lang="ts">
import ChartComponent from '@/components/ChartComponent.vue';
import {Options, Vue} from "vue-class-component";
import {DateTime} from 'luxon';
import {getDayLength} from '@/api/api';


@Options({
  components: {
    ChartComponent,
  },
})
export default class ChartView extends Vue {
  lat = 0;
  lng = 0;
  dayLengthArray: number[] = [];


  datesForYear() {
    const currentDate = DateTime.now();
    const targetDayOfMonth = currentDate.day;
    const currentYear = currentDate.year;

    return Array.from({length: 12}, (_, monthIndex) => {
      return DateTime.local(currentYear, monthIndex + 1, targetDayOfMonth).toFormat('yyyy-MM-dd')
    })
  }

  async fetchCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
          (position) => {
            this.lat = position.coords.latitude;
            this.lng = position.coords.longitude;
          },
          (error) => {
            console.error('Error getting position:', error);
          }
      )
    } else {
      console.error('Geolocation is not supported by your browser')
    }
  }

  async fetchData(lat: number, lng: number, date: string) {
    try {
      const dayLength = await getDayLength(lat, lng, date);
      const timeParts = dayLength.split(':').map(Number);
      const totalHours = (timeParts[0] * 3600 + timeParts[1] * 60 + timeParts[2]) / 3600;

      this.dayLengthArray.push(totalHours);
    } catch (error) {
      console.error('Error getting day length ', error);
    }
  }

  async mounted() {
    await this.fetchCurrentLocation();
    setTimeout(async ()=>{
    const dates = this.datesForYear();
    for (const date of dates) {
      if (this.lat !== null && this.lng !== null) {
          await this.fetchData(this.lat, this.lng, date);
      }
    }
  },500)
  }

  data() {
    const validDate = this.datesForYear().filter(date => date !== 'Invalid DateTime');
    return {
      chartData: {
        labels: validDate,
        datasets: [
          {
            label: 'Daylight hours',
            backgroundColor: ['#77CEFF', '#0079AF', '#123E6B'],
            data: this.dayLengthArray,
          },
        ],
      },
    };
  }
}
</script>
