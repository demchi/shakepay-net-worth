import { defineComponent } from "vue"
import Chart from 'chart.js'

const NetWorthChart = defineComponent({
  name: "Net Worth Chart",
  setup () {

    return () => {
      return (<canvas id="networth-chart"></canvas>)
    }
  }
})

export default NetWorthChart
