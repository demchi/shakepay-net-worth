import { defineComponent, ref, onMounted } from "vue"
import rates from "../rates.json";
import transactions from "../transaction_history.json";
import Chart from 'chart.js'

const Home = defineComponent({
  name: "Home",
  setup () {

    const btcCadRate = rates.BTC_CAD;
    const ethCadRate = rates.ETH_CAD;
    const cadBalance = ref(0);
    const btcBalance = ref(0);
    const ethBalance = ref(0);
    const transactionsOldToNew = [...transactions].reverse()

    const netWorth = transactionsOldToNew.map(t => {
      if(t.type === 'conversion') {
        switch (t.from?.currency) {
          case 'CAD':
            cadBalance.value -= t.from?.amount
            break
          case 'BTC':
            btcBalance.value -= t.from?.amount
            break
          case 'ETH':
            ethBalance.value -= t.from?.amount
            break
          default:
            console.log('Error')
        }
        switch (t.to?.currency) {
          case 'CAD':
            cadBalance.value += t.to?.amount
            break
          case 'BTC':
            btcBalance.value += t.to?.amount
            break
          case 'ETH':
            ethBalance.value += t.to?.amount
            break
          default:
            console.log('Error')
        }
      }
      else {
        switch (t.currency) {
          case 'CAD':
            t.direction === 'credit' ? cadBalance.value += t.amount : cadBalance.value -= t.amount
            break
          case 'BTC':
            t.direction === 'credit' ? btcBalance.value += t.amount : btcBalance.value -= t.amount
            break
          case 'ETH':
            t.direction === 'credit' ? ethBalance.value += t.amount : ethBalance.value -= t.amount
            break
          default:
            console.log('Error')
        }
      }
      
      return {
        netWorth: cadBalance.value + (btcBalance.value * btcCadRate) + (ethBalance.value * ethCadRate),
        time: t.createdAt
      }
    })


    const netWorthByDate = netWorth.reduce((acc : any, entry) => {
      const date = entry.time.split("T")[0].split("-")
      const month = date[0] + "-" + date[1]
      acc[month] = entry
      return acc
    }, {})

    const timeKeys = Object.keys(netWorthByDate).sort()

    const total = (cadBalance.value + (btcBalance.value * btcCadRate) + (ethBalance.value * ethCadRate)).toLocaleString('en-US', {
      style: 'currency',
      currency: 'CAD',
    });

    const cadTotal = cadBalance.value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'CAD',
    });

    const chartOptions = {
      type: "line",
      data: {
        labels: timeKeys,
        datasets: [
         {
            label: "Net Worth",
            data: timeKeys.map(d => netWorthByDate[d].netWorth),
            backgroundColor: "rgba(54,73,93,.5)",
            borderColor: "#36495d",
            borderWidth: 3
          },
        ]
      },
      options: {
        responsive: true,
        lineTension: 1,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                padding: 25
              }
            }
          ]
        }
      }
    };

    onMounted(() => {
      const ctx = document.getElementById('networth-chart');
      new Chart(ctx as HTMLCanvasElement, chartOptions);
    })
    
    return () => {
      console.log(netWorth)
      return (<main class="bg-gray-100 p-4">
        <div class="bg-gray-900 flex flex-wrap justify-between p-4 mb-4 mx-auto max-w-[1200px] rounded-md w-full">
          <p class="font-semibold mb-2 mr-4 text-white">Net Worth: {total}</p>
          <div>
            <p class="font-semibold mb-2 text-white">CAD: {cadTotal}</p>
            <p class="font-semibold mb-2 text-white">BTC: {btcBalance.value * btcCadRate}</p>
            <p class="font-semibold text-white">ETH: {ethBalance.value * ethCadRate}</p>
          </div>
        </div>
        <div class="m-auto max-w-[1200px]">
          <canvas class="" height="400" width="900" id="networth-chart"></canvas>
        </div>
      </main>)
    }
  }
})

export default Home
