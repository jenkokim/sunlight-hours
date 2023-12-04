<template>
  <h5 class="card-title">{{ formattedDate }}</h5>
  <div class="card-body">
    <p class="text">Day Light:</p>
    <p class="daylight-hours">{{ dayLength }}</p>
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
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
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
      if (this.lat != null && this.lng != null && DateTime.fromISO(this.date).isValid) {
        this.fetchData(this.lat, this.lng, this.date);
      }
    },
  },
  watch: {
    lat: 'handleCoordsChange',
    lng: 'handleCoordsChange',
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
