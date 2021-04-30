import { defineComponent } from "vue";

const App = defineComponent({
  name: "App",
  setup () {
    return () => {
      return (<div class="bg-gray-100 flex flex-col min-h-screen">
        <router-view class="flex-1" />
      </div>)
    }
  }
})

export default App