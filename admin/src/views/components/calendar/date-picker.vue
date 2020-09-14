<template>
  <div v-click-outside>
    <input type="text" :value="formatDate" />
    <div v-if="isVisible" class="pannel">
      <div class="pannel-nav">
        <span>&lt;</span>
        <span @click="prevMonth">&lt;&lt;</span>
        <span>{{ time.year }}年</span>
        <span>{{ time.month+1 }}月</span>
        <span @click="nextMonth">&gt;&gt;</span>
        <span>&gt;</span>
      </div>
      <div class="pannel-content">
        <div>
          <span v-for="k in weekDays" :key="k" class="cell">{{ k }}</span>
        </div>
        <div v-for="i in 6" :key="i">
          <span
            v-for="j in 7"
            :key="j"
            class="cell cell-days"
            :class="[
              {notCurrentMonth: !isCurrentMonth(visibeDays[(i-1)*7+(j-1)])},
              {today: isToday(visibeDays[(i-1)*7+(j-1)])},
              {select: isSelect(visibeDays[(i-1)*7+(j-1)])}
            ]"
            @click="chooseDate(visibeDays[(i-1)*7+(j-1)])"
          >{{ visibeDays[(i-1)*7+(j-1)].getDate() }}</span>
        </div>
      </div>
      <div class="pannel-footer">今天</div>
    </div>
  </div>
</template>

<script>
import * as utils from "@/utils/common";
export default {
  name: "DatePicker",

  directives: {
    clickOutside: {
      bind(el, bindings, vnode) {
        console.log("arguments", arguments);
        const handler = (e) => {
          if (el.contains(e.target)) {
            if (!vnode.context.isVisible) {
              vnode.context.focus();
            }
          } else {
            if (vnode.context.isVisible) {
              vnode.context.blur();
            }
          }
        };
        el.handler = handler;
        document.addEventListener("click", handler);
      },
      unbind(el) {
        document.removeEventListener("click", el.handler);
      },
    },
  },
  props: {
    value: {
      type: Date,
      default: () => new Date(),
    },
  },
  data() {
    const { year, month } = utils.getYearMonthDay(this.value);
    return {
      weekDays: ["日", "一", "二", "三", "四", "五", "六"],
      isVisible: false,
      time: { year, month },
    };
  },
  computed: {
    visibeDays() {
      // let { year, month } = utils.getYearMonthDay(this.value);
      const { year, month } = utils.getYearMonthDay(
        utils.getDate(this.time.year, this.time.month, 1)
      );
      // 获取每月第一天
      const currentFirstDay = utils.getDate(year, month, 1);
      // 周几
      const week = currentFirstDay.getDay();
      // 开始的天数
      const startDay = currentFirstDay - week * 60 * 60 * 1000 * 24;
      // 循环42天
      const arr = [];
      for (let i = 0; i < 42; i++) {
        arr.push(new Date(startDay + i * 60 * 60 * 1000 * 24)); // push每天
      }
      return arr;
    },
    formatDate() {
      const { year, month, day } = utils.getYearMonthDay(this.value);
      return `${year}-${month + 1}-${day}`;
    },
  },
  mounted() {},
  methods: {
    focus() {
      this.isVisible = true;
    },
    blur() {
      this.isVisible = false;
    },
    // 是否当月
    isCurrentMonth(date) {
      // let { year, month } = utils.getYearMonthDay(this.value);
      const { year, month } = utils.getYearMonthDay(
        utils.getDate(this.time.year, this.time.month, 1)
      );
      const { year: y, month: m } = utils.getYearMonthDay(date);
      return year === y && month === m;
    },
    // 是否今天
    isToday(date) {
      const { year, month, day } = utils.getYearMonthDay(new Date());
      const { year: y, month: m, day: d } = utils.getYearMonthDay(date);
      return year === y && month === m && day === d;
    },
    // 选中某天
    isSelect(date) {
      const { year, month, day } = utils.getYearMonthDay(this.value);
      const { year: y, month: m, day: d } = utils.getYearMonthDay(date);
      return year === y && month === m && day === d;
    },
    chooseDate(date) {
      this.time = utils.getYearMonthDay(date);
      this.$emit("input", date);
      this.blur();
    },
    prevMonth() {
      // 获取当前的年月的一个日期
      const d = utils.getDate(this.time.year, this.time.month, 1);
      d.setMonth(d.getMonth() - 1);
      this.time = utils.getYearMonthDay(d);
    },
    nextMonth() {
      // 获取当前的年月的一个日期
      const d = utils.getDate(this.time.year, this.time.month, 1);
      d.setMonth(d.getMonth() + 1);
      this.time = utils.getYearMonthDay(d);
    },
  },
};
</script>

<style lang="scss" scoped>
.pannel {
  position: absolute;
  background: #fff;
  border: 1px solid #ccc;
  .pannel-nav {
    line-height: 30px;
    display: flex;
    justify-content: space-around;
    span {
      cursor: pointer;
      user-select: none;
    }
  }
  .pannel-content {
    .cell {
      width: 32px;
      height: 32px;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      font-weight: 700;
      box-sizing: border-box;
    }
    .cell-days {
      &:hover {
        border: 1px solid #000;
        cursor: pointer;
      }
    }
    .select {
      border: 1px solid #000;
      cursor: pointer;
    }
  }
  .pannel-footer {
    line-height: 30px;
  }
}
.notCurrentMonth {
  color: #d0d0d0;
}
.today {
  color: #fff;
  background: #f60;
  border-radius: 5px;
}
</style>
