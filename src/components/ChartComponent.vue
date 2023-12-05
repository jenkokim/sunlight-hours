<template>
  <div id="app" style="width: 400px">
    <BarChart v-bind="barChartProps" />
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';
import { BarChart, useBarChart } from 'vue-chart-3';
import { ref, computed, defineComponent } from 'vue';

Chart.register(...registerables);

export default defineComponent({
  name: 'App',
  components: {
    BarChart,
  },
  props: {
    chartData: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const data = ref(props.chartData);

    const { barChartProps, barChartRef } = useBarChart({
      chartData: data,
    });

    return {barChartProps, barChartRef };
  },
});
</script>

