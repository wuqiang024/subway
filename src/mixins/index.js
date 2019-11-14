export const mixin = {
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 20,
        lineName: undefined, // 事故线路
        directionName: undefined, // 事故方向
        accidentType: undefined, // 事故类型
        festivalTypes: undefined, // 节日类型
        fileTypes: undefined, // 文件类型
        dateTypes: undefined, // 日期类型
        interruptTypes: undefined,
        accidentLevel: undefined, // 事故等级
        sort: '+id',
        orderBy: undefined // 按最高等级
      },
      routes: [],
      directions: [],
      accidentTypes: [],
      fileTypes: undefined,
      dateTypes: [],
      festivalTypes: [],
      accidentLevels: [],
      interruptTypes: [],
      orderBy: [],
      tableData: undefined,
      dateRange: '',
      startTime: '',
      endTime: ''
    }
  },
  computed: {
    platforms() {
      const arr = []
      if (this.tableData && this.tableData.length > 0) {
        this.tableData.forEach(v => {
          arr.push(v.from)
        })
      }
      return arr
      // return this.tableData;
    }
  },
  methods: {
    getRoutes() {
      this.routes = [
        { id: 1, name: '1号线' },
        { id: 2, name: '2号线' },
        { id: 3, name: '3号线' },
        { id: 4, name: '4号线' },
        { id: 5, name: '5号线' },
        { id: 6, name: '6号线' },
        { id: 7, name: 'APM线' },
        { id: 8, name: '广佛线' }]
    },
    getDirections() {
      this.directions = [
        { id: 1, name: '上行' },
        { id: 2, name: '下行' },
        { id: 3, name: '上下行' }]
    },
    getAccidentTypes() {
      this.accidentTypes = [
        { id: 1, name: '火灾事故' },
        { id: 2, name: '车辆故障' },
        { id: 3, name: '供电故障' },
        { id: 4, name: 'AFC故障' },
        { id: 5, name: '大客流' },
        { id: 6, name: '线路故障' },
        { id: 7, name: '暴恐袭击' },
        { id: 8, name: '恶劣天气' },
        { id: 9, name: '其他' }]
    },
    getFileTypes() {
      this.fileTypes = [
        { id: 1, name: 'OD客流表' },
        { id: 2, name: '断面客流表' },
        { id: 3, name: '列车时刻表' },
        { id: 4, name: '公交枢纽表' },
        { id: 5, name: '出行时间表' },
        { id: 6, name: '行车案场景表' }]
    },
    getDateTypes() {
      this.dateTypes = [
        { id: 1, name: '周一' },
        { id: 2, name: '周二' },
        { id: 3, name: '周三' },
        { id: 4, name: '周四' },
        { id: 5, name: '周五' },
        { id: 6, name: '周六' },
        { id: 7, name: '周日' }]
    },
    getInterruptTypes() {
      this.interruptTypes = [
        { id: 1, name: '单点故障' },
        { id: 2, name: '区间故障' }]
    },
    getFestivalTypes() {
      this.festivalTypes = [
        { id: 1, name: '元旦' },
        { id: 2, name: '妇女节' },
        { id: 3, name: '植树节' },
        { id: 4, name: '劳动节' },
        { id: 5, name: '五四青年节' },
        { id: 6, name: '六一儿童节' },
        { id: 7, name: '建党节' },
        { id: 8, name: '建军节' },
        { id: 9, name: '教师节' },
        { id: 10, name: '国庆节' },
        { id: 11, name: '除夕' },
        { id: 12, name: '春节' },
        { id: 13, name: '清明' },
        { id: 14, name: '端午' },
        { id: 15, name: '七夕节' },
        { id: 16, name: '重阳节' },
        { id: 17, name: '腊八节' },
        { id: 18, name: '情人节' },
        { id: 19, name: '圣诞节' },
        { id: 20, name: '高考' },
        { id: 21, name: '九一八事变' },
        { id: 22, name: '任意' }]
    },
    getAccidentLevels() {
      this.accidentLevels = [
        { id: 1, name: 'I级' },
        { id: 2, name: 'II级' },
        { id: 3, name: 'III级' }]
    },
    getOrderBy() {
      this.orderBy = [
        { key: 'time', name: '按最新时间' },
        { key: 'level', name: '按最高等级' }]
    },
    getDataTable() {
      this.tableData = [{
        from: '西门口',
        to: {
          '西门口': 0,
          '公园前': 23,
          '农讲所': 29,
          '烈士陵园': 39,
          '东山口': 53
        }
      }, {
        from: '公园前',
        to: {
          '西门口': 20,
          '公园前': 0,
          '农讲所': 32,
          '烈士陵园': 35,
          '东山口': 68
        }
      }, {
        from: '农讲所',
        to: {
          '西门口': 0,
          '公园前': 23,
          '农讲所': 29,
          '烈士陵园': 39,
          '东山口': 53
        }
      }, {
        from: '烈士陵园',
        to: {
          '西门口': 0,
          '公园前': 23,
          '农讲所': 29,
          '烈士陵园': 39,
          '东山口': 53
        }
      }, {
        from: '东山口',
        to: {
          '西门口': 0,
          '公园前': 23,
          '农讲所': 29,
          '烈士陵园': 39,
          '东山口': 53
        }
      }]
    }
  },
  watch: {
  }
}
