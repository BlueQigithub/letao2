
$(function(){
    
    //1, 柱状图
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.querySelector('.echarts_left'));

    // 指定图表的配置项和数据
    var option = {
        title: {
            text: '2019年注册人数'
        },
        //提示框组件
        tooltip: {},
        // 图例
        legend: {
            data:['人数',"销量"]
        },
        xAxis: {
            data: ["1月","2月","3月","4月","5月","6月"]
        },
        yAxis: {},
        series: [{
            name: '人数',
            type: 'bar',  //图表类型
            data: [55, 208, 365, 102, 145, 345]
        },
        {
            name: '销量',
            type: 'bar',  //图表类型
            data: [233, 434, 344, 22, 445, 143]
        }]
    };
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);

    //2, 饼状图
    // 基于准备好的dom，初始化echarts实例
    var echarts_right = echarts.init(document.querySelector('.echarts_right'));

      // 指定图表的配置项和数据
      var option =  {
        title : {
            text: '品牌热销',
            subtext: '2019年1月',
            x:'center'
        },
        // 提示框组件
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        // 图例
        legend: {
            orient: 'vertical', //垂直方向
            left: 'left',
            data: ['特步','阿迪达斯','老北京','卓诗尼','奥康']
        },
        series : [
            {
                name: '品牌',  //系列名称
                type: 'pie',
                radius : '55%',  //圆的半径
                center: ['50%', '60%'],  //圆心
                data:[
                    {value:335, name:'特步'},
                    {value:310, name:'阿迪达斯'},
                    {value:234, name:'老北京'},
                    {value:135, name:'卓诗尼'},
                    {value:1548, name:'奥康'}
                ],
                //其他样式
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
         ]
       };
          // 使用刚指定的配置项和数据显示图表。
          echarts_right.setOption(option);

})