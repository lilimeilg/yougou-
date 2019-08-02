// components/Tabs/Tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 接收父组件的传值
    tabs: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 标题的点击事件
    handleTitleChange(e) {
      // 根据index，触发父组件的自定义事件，
      const { index } = e.currentTarget.dataset;
      // console.log(index);
      this.triggerEvent("titleChange", { index });
    }
  }
});
