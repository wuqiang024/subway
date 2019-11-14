<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'

export default {
  // mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'arrowchart'
    },
    id: {
      type: String,
      default: 'arrowchart'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    console.log('1');
    this.initChart()
  },
  beforeDestroy() {
    console.log('1destroyed');
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id))

      this.chart.setOption({
    title: {
        text: ''
    },
    tooltip: {},
    animationDurationUpdate: 1500,
    animationEasingUpdate: 'quinticInOut',
    series : [
        {
            type: 'graph',
            layout: 'none',
            symbolSize: 50,
            // roam: true,
            label: {
                normal: {
                    show: true
                }
            },
            edgeSymbol: ['circle', 'arrow'],
            edgeSymbolSize: [4, 10],
            edgeLabel: {
              normal: {
                textStyle: {
                  fontSize: 20
                }
              }
            },
            data: [{
                name: '西门口',
                x: 100,
                y: 300
            }, {
                name: '公园前',
                x: 200,
                y: 300
            }, {
                name: '农讲所',
                x: 300,
                y: 300
            }, {
                name: '烈士陵园',
                x: 400,
                y: 300
            }],
            // links: [],
            links: [{
                source: 0,
                target: 1,
                symbolSize: [5, 20],
                // label: {
                //     normal: {
                //         show: true
                //     }
                // },
                lineStyle: {
                    normal: {
                        // width: 5,
                       
                    }
                }
            }, {
                source: '西门口',
                target: '公园前',
                // label: {
                //     normal: {
                //         show: true
                //     }
                // },
                lineStyle: {
                    normal: { }
                }
            }, {
                source: '西门口',
                target: '农讲所',
                lineStyle: {
                    normal: { }
                }
            }, {
                source: '西门口',
                target: '烈士陵园',
                lineStyle: {
                    normal: { }
                }
            }, {
                source: '公园前',
                target: '农讲所',
                lineStyle: {
                    normal: { }
                }
            }, {
                source: '公园前',
                target: '烈士陵园',
                lineStyle: {
                    normal: { }
                }
            }],
            lineStyle: {
                normal: {
                    opacity: 0.9,
                    width: 1,
                    curveness: 0.2
                }
            }
        }
    ]
})
    }
  }
}
</script>
