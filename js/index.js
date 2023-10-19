// 监控
(function () {
    // 监控区域 - 切换功能
    $(".content").eq(1).hide()
    $(".monitor .tabs span").click(function () {
        const _index = $(this).index()
        $(this).addClass("active").siblings("span").removeClass("active")
        $(".content").eq(_index).show().siblings(".content").hide()
    })
    // each 遍历dom
    $(".marquee").each(function () {
        // console.log($(this))
        const rows = $(this).children().clone()
        $(this).append(rows)
    })
})();

// 点位
(function () {
    const pie = document.querySelector(".pie")
    const echartsInstance = echarts.init(pie)
    const option = {
        color: ['#006cff', '#60cda0', '#ed8884', '#ff9f7f', '#0096ff', '#9fe6b8', '#32c5e9', '#1d9dff'],
        tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series: [
            {
                name: '销售统计',
                type: 'pie',
                radius: ["10%", "70%"],
                center: ['50%', '50%'],
                roseType: 'radius',
                itemStyle: {
                    borderRadius: 5
                },
                label: {
                    fontSize: 10
                },
                labelLine: {
                    // 连接到图形的线长度
                    length: 6,
                    // 连接到文字的线长度
                    length2: 8
                },
                data: [
                    { value: 20, name: "云南" },
                    { value: 26, name: "北京" },
                    { value: 24, name: "山东" },
                    { value: 25, name: "河北" },
                    { value: 20, name: "江苏" },
                    { value: 25, name: "浙江" },
                    { value: 30, name: "四川" },
                    { value: 42, name: "湖北" }
                ]
            }
        ]
    }
    echartsInstance.setOption(option)
    /* 图标自适应 */
    window.addEventListener("resize", () => {
        echartsInstance.resize()
    })
})();

// 用户
(function () {
    const pie = document.querySelector(".bar")
    const echartsInstance = echarts.init(pie)
    const item = {
        value: 1200,
        itemStyle: {
            color: '#254065'
        },
        // 鼠标经过柱子颜色
        emphasis: {
            itemStyle: {
                color: '#254065'
            }
        },
        // 工具提示隐藏
        tooltip: {
            extraCssText: 'opacity:0'
        }
    };
    const option = {
        color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
                {
                    offset: 0,
                    color: '#00fffb' // 0% 处的颜色
                },
                {
                    offset: 1,
                    color: '#0061ce' // 100% 处的颜色
                }
            ],
            global: false // 缺省为 false
        },
        tooltip: {
            trigger: 'item'
        },
        grid: {
            top: '3%',
            left: '0',
            right: '3%',
            bottom: '3%',
            containLabel: true,
            show: true,
            borderColor: 'rgba(0, 240, 255, 0.3)'
        },
        xAxis: {
            type: 'category',
            data: ['上海', '广州', '北京', '深圳', '合肥', '', '......', '', '杭州', '厦门', '济南', '成都', '重庆'],
            axisTick: {
                // 不显示刻度
                show: false,
                alignWithLabel: false
            },
            axisLabel: {
                color: '#4c9bfd',
                fontSize: 8
            },
            axisLine: {
                lineStyle: {
                    color: 'rgba(0, 240, 255, 0.3)'
                }
            }
        },
        yAxis: {
            type: 'value',
            axisTick: {
                // 不显示刻度
                show: false
            },
            // y坐标轴文字标签样式设置
            axisLabel: {
                color: '#4c9bfd',
                fontSize: 8
            },
            // 轴 颜色
            axisLine: {
                lineStyle: {
                    color: 'rgba(0, 240, 255, 0.3)'
                }
            },
            // y轴 分割线的样式 
            splitLine: {
                lineStyle: {
                    color: 'rgba(0, 240, 255, 0.3)'
                }
            }
        },
        series: [
            {
                data: [2100, 1900, 1700, 1560, 1400, item, item, item, 900, 750, 600, 480, 240
                ],
                type: 'bar',
                showBackground: true,
                backgroundStyle: {
                    color: 'rgba(180, 180, 180, 0.2)'
                }
            }
        ]
    };
    echartsInstance.setOption(option)
    /* 图标自适应 */
    window.addEventListener("resize", () => {
        echartsInstance.resize()
    })
})();

// 订单
(function () {
    var data = {
        day365: { orders: '20,301,987', amount: '99834' },
        day90: { orders: '301,987', amount: '9834' },
        day30: { orders: '1,987', amount: '3834' },
        day1: { orders: '987', amount: '834' }
    }
    // 订单量
    const $orders = $(".order h4").eq(0)
    const $amount = $(".order h4").eq(1)
    $orders.html(data["day365"].orders)
    $amount.html(data["day365"].amount)
    // 声明下标
    let _index = 0;
    // 切换
    $(".order .filter span").click(function () {
        _index = $(this).index()
        render(_index)
    })
    // 渲染函数
    function render(index) {
        const key = $(".order .filter span").get(index).dataset.index
        // console.log(key);
        $(".order .filter span").eq(index).addClass("active").siblings("span").removeClass("active")
        $orders.html(data[key].orders)
        $amount.html(data[key].amount)
    }
    // 自动切换
    let timer
    function autoToggle() {
        timer = setInterval(() => {
            _index++
            if (_index > 3) {
                _index = 0
            }
            render(_index)
        }, 2000)
    }
    autoToggle()

    // 鼠标悬浮停止
    $(".order").hover(function () {
        clearInterval(timer)
    }, function () {
        autoToggle()
    })
})();

// 销售额逻辑
(function () {
    const data = {
        // 年
        year: [
            [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
            [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79]
        ],
        // 季
        quarter: [
            [23, 75, 12, 97, 21, 67, 98, 21, 43, 64, 76, 38],
            [43, 31, 65, 23, 78, 21, 82, 64, 43, 60, 19, 34]
        ],
        // 月
        month: [
            [34, 87, 32, 76, 98, 12, 32, 87, 39, 36, 29, 36],
            [56, 43, 98, 21, 56, 87, 43, 12, 43, 54, 12, 98]
        ],
        // 周
        week: [
            [43, 73, 62, 54, 91, 54, 84, 43, 86, 43, 54, 53],
            [32, 54, 34, 87, 32, 45, 62, 68, 93, 54, 54, 24]
        ]
    }
    // 声明下标
    let _index = 0;
    // 切换
    $(".sales .caption span").click(function () {
        _index = $(this).index() - 1
        render(_index)
    })
    // 自动切换
    let timer
    function autoToggle() {
        timer = setInterval(() => {
            _index++
            if (_index > 3) {
                _index = 0
            }
            render(_index)
        }, 2000)
    }
    autoToggle()

    // 鼠标悬浮停止
    $(".sales").hover(function () {
        clearInterval(timer)
    }, function () {
        autoToggle()
    })
    // 渲染函数
    function render(index) {
        const key = $(".sales .caption span").get(index).dataset.index
        $(".sales .caption span").eq(index).addClass("active").siblings("span").removeClass("active")
        option.series[0].data = data[key][0]
        option.series[1].data = data[key][1]
        echartsInstance.setOption(option)
    }
    // 初始化图表
    const line = document.querySelector(".line")
    const echartsInstance = echarts.init(line)
    const option = {
        title: {
            text: '单位：万',
            left: '25',
            textStyle: {
                fontSize: '8',
                color: '#4996f5'
            }
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            textStyle: {
                fontSize: '10',
                color: '#4996f5'
            },
            data: ['预计销售额', '实际销售额'],
            right: '0'
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '0',
            top: '25%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            axisLabel: {
                color: '#4c9bfd',
                fontSize: 8
            },
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                color: '#4c9bfd',
                fontSize: 8
            },
        },
        series: [
            {
                name: '预计销售额',
                type: 'line',
                stack: 'Total',
                data: [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
                itemStyle: {
                    color: '#00f2f1'
                },
                // 曲线
                smooth: true
            },
            {
                name: '实际销售额',
                type: 'line',
                stack: 'Total',
                data: [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79],
                itemStyle: {
                    color: '#f00'
                },
                smooth: true
            }
        ]
    }
    echartsInstance.setOption(option)
    // 图表自适应
    window.addEventListener("resize", () => {
        echartsInstance.resize()
    })
})()