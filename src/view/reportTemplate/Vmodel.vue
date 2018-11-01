<template>
  <div>
    <input type="text" :value="value" ref="input">
    <span>{{value}}</span><input type="checkbox" :checked="checked" :value="value" />
    <div @click="doThis">
      点击
    </div>

  </div>
</template>
<script>
export default {
  data() {
    return {
      a: [
        {
          id: 1,
          content: "今天不开心"
        },
        {
          id: 2,
          content: "今天很开心"
        },
        {
          id: 2,
          content: "今天很开心"
        },
        {
          id: 123,
          content: "今天可以开心"
        },
        {
          id: 2323123,
          content: "今天1231231231可以开心"
        }
      ],
      b: [
        {
          id: 1,
          content: "今天不开心"
        },
        {
          id: 2,
          content: "今天很开心"
        },
        {
          id: 1,
          content: "今天可以开心"
        },
        {
          id: 123,
          content: "今天可以开心"
        },
        {
          id: 1123,
          content: "今天可以开心"
        }
      ]
    };
  },
  model: {
    prop: "checked",
    event: "click"
  },
  props: {
    checked: Boolean,
    value: String
  },
  created() {
    console.log(this.removeDuplicate(this.a, this.b));
  },
  methods: {
    doThis() {
      console.log(!this.checked);
      this.$emit("click", !this.checked);
    },
    removeDuplicate(a, b) {
      let akey = a.map(r => r.id);
      let bkey = b.map(r => r.id);
      let keySet = Array.from(...new Set().add(Object.assign(akey, bkey)));
      let aaIsType = [];
      let aa =[];
       a.forEach((item, index, row) => {
        if (aaIsType.indexOf(item.id) === -1) {
          b.map(r => {
            if (r.id === item.id) {
              item.page ? (item.page += item.page) : (item.page = 1);
            }
          });
          aaIsType.push(item.id);
          aa.push(item);
        }
      });
      keySet.map(r => {
        if (!aa.filter(item => item.id === r)[0]) {
          aa.push(b.filter(item => item.id === r)[0]);
        }
      });
      return aa;
    }
  }
};
</script>
<style>
</style>