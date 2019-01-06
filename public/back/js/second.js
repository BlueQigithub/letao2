
//需求: 已进入页面就发送ajax请求 , 获取数据 渲染页面
$( function(){
    var currentPage = 1;
     
     rander();
    function rander(){
        $.ajax({
            url:"/category/querySecondCategoryPaging",
            type:"get",
            data:{
                page:currentPage,
                pageSize:5,
            },
            dataType:"json",
            success:function( info ){
                // console.log( info );
                //使用模板引擎渲染
                var htmlStr = template( "secondId", info);
                $("tbody").html(htmlStr);
    
                //对获取的数据条数进行分页
                $(".secondPage").bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage : info.page,
                    totalPages : Math.ceil( info.total / info.size ),
                    onPageClicked:function( a , b , c , page){
                        //page 是点击的当前页值
                          currentPage = page;
                          rander();
                    }
                })
            }
        })
    }

//2, 点击添加按钮 发送ajax请求 获取所有的一级分类名称 , 渲染到下拉框中 , 模态框显示
   $(".btnAdd").on("click",function(){
       $.ajax({
           url:"/category/querySecondCategoryPaging",
           type:"get",
           data:{
               page:1,
               pageSize:100,
           },
           dataType:"json",
           success:function( info ){
            //    console.log( info );
               //使用模板引擎
               var  htmlStr = template("drowDownId" , info)
               $(".dropdown-menu").html(htmlStr);              
           }
       })
       $("#AddModal").modal("show");
   })

 //3, 点击下拉菜单时 , 获取a的text文本 , 赋值给button的text (事件委托)
     $(".dropdown-menu").on("click", "a", function(){
        //  console.log(this);
        var txt = $(this).text();
        $("#drowText").text(txt);
     })
    
//4, 使用jquery-fileupload插件 , 配置fileUpload初始化
  $("#fileupload").fileupload({
       dataType:"json",
        //文件上传完成的回调函数
        done:function( e , data ){
            // console.log(data); 是个对象, 通过data.result.picAddr可以获取上传后的图片地址
        var picStr = data.result.picAddr;
        console.log(picStr)
        $(".imgBox img").attr("src",picStr)
         
        }
   })


})