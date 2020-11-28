<template>
  <div class="dashboard-container">
    <div class="dashboard-text">欢迎你，计算机工程学院学生信息管理员: {{ name }}</div>
    <div class="dashboard-bottom">&copy;李凯玉 &nbsp;&nbsp;&nbsp;&reg;河南经贸职业学院</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
  .dashboard-container{
    width: 1920px;
    height: 820px;
    background-image: url("../photo/indexbg.jpg");
  }
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
  &-bottom{
    position:fixed;
    right: 10px;
    bottom:10px;
    font-size: 4px;
  }
}
</style>
