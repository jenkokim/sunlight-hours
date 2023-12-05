<template>
  <div class="data-picker">
    <div class="picker-container">
      <VueDatePicker v-model="selectedDate" format="yyyy-MM-dd"></VueDatePicker>
      <button class="btn btn-primary mt-3" @click="submitRequest">Get daylight hours for selected day</button>
    </div>
    <div v-if="dateIsSelected" class="daylight-component d-flex justify-content-center mt-3">
      <div class="card p-3">
        <DaylightHours :date="date" :coordinates="{lat, lng}"></DaylightHours>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker';
import {Options, Vue} from 'vue-class-component';
import '@vuepic/vue-datepicker/dist/main.css'
import {DateTime} from "luxon";
import DaylightHours from "@/components/DaylightHours.vue";

@Options({
  components: {
    DaylightHours,
    VueDatePicker,
  },
})

export default class DatePickerView extends Vue {
  date = ''
  selectedDate: string | null = null
  lat = 0
  lng = 0
  dateIsSelected = false

  fetchCurrentLocation() {
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

  async created() {
    this.fetchCurrentLocation()
  }

  async submitRequest() {
    if (this.selectedDate) {
      this.date = DateTime.fromJSDate(new Date(this.selectedDate)).toFormat('yyyy-MM-dd')
      this.dateIsSelected = true
    } else {
      console.warn('Pick date before send request.');
    }
  }


}
</script>
