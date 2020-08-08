export default {
  namespace: 'aac',
  data() {
    return {
      def: 'mixin的数据'
    }
  },
  mounted() {
    this.getMessage()
  },
  methods: {
    getMessage() {
      console.log('mixins方法先执行', this.formCongfig)
    }
  }
}
