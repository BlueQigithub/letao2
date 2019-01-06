

//需要 : 已经页面就要发送ajax请求 , 渲染页面
$(function(){
    var currentPage = 1;
     
    rander();
    function rander(){
        $.ajax({
            url:"/category/queryTopCategoryPaging",
            type:"get",
            data:{
                page:currentPage,
                pageSize:5,
            },
            dataType:"json",
            success:function( info ){
                // console.log( info );
                //使用模板引擎渲染页面
                var htmlStr = template("firstId", info);
                $("tbody").html(htmlStr);
                
                //分页 把获取到的数据条数, 使用分页插件渲染出来
                $(".firstPage").bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:info.page,
                    totalPages: Math.ceil( info.total / info.size),
                    onPageClicked:function( a , b , c , page){
                        //page是点击的页数
                        currentPage = page;
                        //重新渲染
                        rander();
                    }
                })
            }
        })
    }

//2, 点击添加按钮 , 模态框出现
$(".btnAdd").on("click", function(){
    $("#firstAddModal").modal("show"); 
})

 //3, 表单校验
 $(".form-group").bootstrapValidator({
     //显示校验时的图标
    feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
      },
     //校验的字段
     fields:{
        categoryName:{
            //校验的规范
            validators:{
              notEmpty:{
                  message:"请输入一级分类",
              }
            }
        }
     }
 })

 // 4, 表单校验成功完成后 , 会触发success.form.bv事件 , 此时会提交表单
 $("#form").on('success.form.bv', function( e ){
   //阻止submit按钮的提交 , 使用ajax提交
     e.preventDefault();

    $.ajax({
      url:"/category/addTopCategory",
      type:"post",
      data:$("#form").serialize(),
      dataType:"json",
      success:function( info ){
        //   console.log( info );
        if(info.success){
            //关闭模态框
            $("#firstAddModal").modal("hide");
            //重新渲染页面
             rander();
            //重置表单 内容和表单装态都有重置 , 如果只要重置内容就不用写true
            $('#form').data("bootstrapValidator").resetForm(true);
        }
      }
    })
  })
})