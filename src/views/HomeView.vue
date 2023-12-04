<template>
  <div class="home">
    <div class="container">
      <div class="row">
        <div class="col-md-6 today">
          <h3>Actual date</h3>
          <p class="date">{{ this.currentDate }}</p>
        </div>
        <div class="col-md-6 geolocation">
          <h3>Actual location</h3>
          <p class="coords">{{ lat }} - {{ lng }}</p>
        </div>
      </div>
      <div class="component-container row d-flex justify-content-between">
        <div v-for="(date, index) in datesForYear" :key="index" class="col card">
          <DaylightHours v-if="lat !== null && lng !== null" :date="date" :lat="lat" :lng="lng" />
          <DaylightHours v-else :date="date" :lat=0 :lng=0 />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import DaylightHours from '@/components/DaylightHours.vue';
import {DateTime} from 'luxon';

@Options({
  components: {
    DaylightHours,
  },
})
export default class HomeView extends Vue {
  currentDate: string  = DateTime.now().toFormat('yyyy-MM-dd');
  lat: number | null = null;
  lng: number | null = null;

  async fetchCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
          (position) => {
            this.lat = position.coords.latitude;
            this.lng = position.coords.longitude;

          },
          (error) => {
            console.error('Errore getting position:', error);
          }
      )
    } else {
      console.error('Geolocation is not supported by your browser')
    }
  }

  created() {
    this.fetchCurrentLocation();
  }

  get datesForYear() {
    const currentDate = DateTime.now();
    const targetDayOfMonth = 31//currentDate.day;
    const currentYear = currentDate.year;

    return Array.from({length: 12}, (_, monthIndex) => {
      let isValidDay = DateTime.now().set({month: monthIndex + 1}).daysInMonth < targetDayOfMonth ? 'true' : 'false'

      return isValidDay
          ? DateTime.local(currentYear, monthIndex + 1, targetDayOfMonth).toFormat('yyyy-MM-dd')
          : 'invalid-date';
    })
  }

}
</script>
<style>

</style>