<template>
  <div>
    <!-- :value="now" @input="(val)=>value = val" -->
    <DatePicker v-model="now" />
  </div>
</template>

<script>
import DatePicker from './date-picker'
export default {
  name: 'Calendar',
  components: { DatePicker },
  data() {
    return {
      now: new Date()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
