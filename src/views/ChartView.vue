<template>
  <div>
    <ChartComponent :chartData="chartData" />
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
export default class HomeView extends Vue{
  currentDate: string  = DateTime.now().toFormat('dd-MM-yyyy');
  lat: number | null = null;
  lng: number | null = null;
  dayLengthArray: number[] = [];

    datesForYear() {
    const currentDate = DateTime.now();
    const targetDayOfMonth = currentDate.day;
    const currentYear = currentDate.year;

    return Array.from({length: 12}, (_, monthIndex) => {
      let isValidDay = DateTime.now().set({month: monthIndex + 1}).daysInMonth < targetDayOfMonth ? 'true' : 'false'

      return isValidDay
          ? DateTime.local(currentYear, monthIndex + 1, targetDayOfMonth).toFormat('yyyy-MM-dd')
          : 'invalid-date';
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
      const totalSeconds = timeParts[0] * 3600 + timeParts[1] * 60 + timeParts[2];

      this.dayLengthArray.push(totalSeconds);
    } catch (error) {
      console.error('Error getting day length ', error);
    }
  }
  async created() {
    await this.fetchCurrentLocation();
    const dates = this.datesForYear();
    for (const date of dates) {
      if (this.lat !== null && this.lng !== null) {
        await this.fetchData(this.lat, this.lng, date);
      }
    }

  }
  data(){

  return {
      chartData: {
        labels: this.datesForYear(),
        datasets: [
          {
            label: 'Dataset 1',
            backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED'],
            data:this.dayLengthArray,
          },
        ],
      },
    };
  }
}
</script>
