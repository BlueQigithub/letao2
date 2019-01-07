
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

        //获取id , 赋值给隐藏域 用于提交
        var id = $(this).data("id");
        $('[name="categoryId"]').val(id);

        //对于隐藏域赋值后 , 需将隐藏域表单校验状态改为成功状态
      $('#form').data("bootstrapValidator").updateStatus( "categoryId", "VALID" );

     })
    
//4, 使用jquery-fileupload插件 , 配置fileUpload初始化
  $("#fileupload").fileupload({
       dataType:"json",
        //文件上传完成的回调函数
        done:function( e , data ){
            // console.log(data); 是个对象, 通过data.result.picAddr可以获取上传后的图片地址
        var picStr = data.result.picAddr;
        // console.log(picStr)
        $(".imgBox img").attr("src",picStr)
         
        //获取上传图片地址 , 赋值给隐藏域 , 用于提交
        $('[name="brandLogo"]').val(picStr);

       //对于隐藏域赋值后 , 需将隐藏域表单校验状态改为成功状态
       $("#form").data("bootstrapValidator").updateStatus("brandLogo","VALID");

        }
   })

// 5, 表单校验 , 使用使用bootstrapValidator插件
$("#form").bootstrapValidator({
    //配置不校验的类型 , 需要对hidden进行校验
    excluded: [],
    //校验时显示的图片
    feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
      },
    // //校验的字段
    fields:{
        categoryId:{
            validators:{
                notEmpty:{
                    message:"请选择一级分类"
                }
            }
        },
        brandName:{
            validators:{
                notEmpty:{
                    message:"请输入二级分类"
                }
            }
        },
        brandLogo:{
            validators:{
                notEmpty:{
                    message:"请上传图片"
                }
            }
        } 
    }
})

//6, 表单校验完成时 , 会触发success.form.bv事件,此时会提交表单
$("#form").on("success.form.bv" , function( e ){
    e.preventDefault();
    //发送ajax请求
    $.ajax({
        url:"/category/addSecondCategory",
        type:"post",
        data:$("#form").serialize(),
        dataType:"json",
        success:function( info ){
            // console.log(info);
            //模态框关闭
            $("#AddModal").modal("hide");
            //重新显然页面
            rander();

            //表单状态和内容都要重置
            $("#form").data('bootstrapValidator').resetForm(true);
            //手动重置下拉框和图片
            $("#drowText").text("请选择一级分类");
            $(".imgBox img").attr("src","./images/none.png");
        }
    })
})

})