<template>
  <h5 class="card-title">{{ formattedDate }}</h5>
  <div class="card-body">
    <p class="text">Day Light:</p>
    <p class="daylight-hours">{{ dayLength || '..:..:..' }}</p>
  </div>

</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {getDayLength} from '@/api/api';
import {DateTime} from "luxon";

export default defineComponent({
  props: {
    date: {
      type: String,
      required: true,
    },
    coordinates: {
      type: Object,
      required: true,
      default: ()=>({
        lat:0,
        lng:0
      })
    },
  },
  data() {
    return {
      dayLength: null as string | null,
    }
  },
  methods: {
    async fetchData(lat: number, lng: number, date: string) {
      try {
        this.dayLength = await getDayLength(lat, lng, date)
      } catch (error) {
        console.error('Error getting day length ', error)
      }
    },
    handleCoordsChange() {
      if (this.coordinates.lat && this.coordinates.lng && DateTime.fromISO(this.date).isValid) {
        this.fetchData(this.coordinates.lat, this.coordinates.lng, this.date);
      }
    },
  },
  watch: {
    coordinates(val, oldVal){
      if (val !== oldVal)
        this.handleCoordsChange()
    },
    date: 'fetchData',
  },
  created() {
    this.handleCoordsChange();
  },
  computed: {
    formattedDate(): string {
      return DateTime.fromISO(this.date).isValid ? DateTime.fromISO(this.date).toFormat('ccc dd LLL yyyy') : 'Invalid date';
    },
  },
});
</script>