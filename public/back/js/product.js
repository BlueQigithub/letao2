

//需求: 一进入页面 , 就发送ajax请求 , 渲染页面
$( function(){
    var currentPage = 1;
    var pageSize = 2;
    rander();
    function rander(){
        $.ajax({
            url:"/product/queryProductDetailList",
            type:"get",
            data:{
                page: currentPage,
                pageSize: pageSize,
            },
            dataType:"json",
            success:function( info ){
                // console.log(info);
                var htmlstr = template("prodId", info);
                $("tbody").html(htmlstr);

            //使用分页插件
            $(".prodPage").bootstrapPaginator({
                bootstrapMajorVersion:3,
                currentPage : info.page,
                totalPages : Math.ceil( info.total / info.size),
                //给分页按钮绑定事件
                onPageClicked:function( a , b , c , page){
                    currentPage = page;
                     rander();
                  }
                })
            }
        })
    }

//2, 点击添加按钮 ,发送ajax请求, 获取所有的二级分类 , 在li中渲染  模态框显示
    $(".prodAddBtn").on("click",function(){
      $.ajax({
          url:"/category/querySecondCategoryPaging",
          type:"get",
          data:{
              page:1,
              pageSize:100,
          },
          dataType:"json",
          success:function( info ){
            //   console.log(info);
             var htmlstr = template("drowpId", info);
             $(".dropdown-menu").html(htmlstr);
          }
      })

        $("#prodModal").modal("show");
   })

//3, 给下拉菜单的所有a , 注册点击事件 (事件委托) 获取a的text值 赋值给drowText的text值 , 同时并获取id 赋值给隐藏域的value
$(".dropdown-menu").on("click", "a" ,function(){
    //获取a的text
    var txt = $(this).text();
    $("#drowText").text(txt);
   //获取id 赋值给隐藏域 用于提交
   var id = $(this).data("id");
    $('[name="brandId"]').val(id);

  //给隐藏域赋值成功后 , 改变表单状态 
  $('#form').data("bootstrapValidator").updateStatus( "brandId" , "VALID");
})


//4, 配置多个文件上传 , 图片要上传3张 , 要声明一个数组, 专门存放图片的地址,
var picArr=[];
$("#fileupload").fileupload({
    //返回的数据类型
    dataType:"json",
   //图片上传完成后的回调函数 
   done:function( e , data ){
    //    console.log(data);  //data对象中的result.picAddr可获取图片的地址
    var picObj = data.result; //往后台返回的数组对象

    //把获取到的地址添加到数组的前面
    picArr.unshift( picObj);
    picSrc = picObj.picAddr; //往后台传送的图片地址

    //将图片添加到imgBox的最前面
    $(".imgBox").prepend('<img src="'+ picSrc +'" alt="" style="width:80px;"> ')

    if( picArr.length > 3){
        //从数组的后面删除最后一个数据
        picArr.pop();
       //图片也要删除
       $(".imgBox img:last-of-type").remove();
    }

     //如果数组中的长度满3张 , 校验成功
    if(picArr.length === 3){ 
        //给隐藏域赋值成功后 , 改变表单状态 
      $('#form').data("bootstrapValidator").updateStatus( "picStauts" , "VALID");
    }
   }
})

//5, 表单校验
  $("#form").bootstrapValidator({
     //对于隐藏域 需要验证
     excluded: [],
    //校验显示的图标
    feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
    },
    //校验字段
    fields:{
        brandId:{
            validators:{
                notEmpty:{
                    message:"请选择二级分类",
                }
            }
        },
        proName:{
            validators:{
                notEmpty:{
                    message:"请输入商品名称",
                }
            }
        },
        proDesc:{
            validators:{
                notEmpty:{
                    message:"请输入商品描述",
                }
            }
        },
        num:{
            validators:{
                notEmpty:{
                    message:"请输入商品库存",
                },
                //正则校验
                regexp: {
                    regexp: /^[1-9]\d*$/,
                    message: '非零开头'
                }
            }
        },
        size:{
            validators:{
                notEmpty:{
                    message:"请输入商品尺码",
                },
                //正则校验
                regexp: {
                    regexp: /^\d{2}-\d{2}$/,
                    message: '必须是 xx-xx 的格式, xx为两位的数字, 例如: 35-45',
                }
            }
        },
        oldPrice:{
            validators:{
                notEmpty:{
                    message:"请输入商品原价",
                }
            }
        },
        price:{
            validators:{
                notEmpty:{
                    message:"请输入商品现价",
                }
            }
        },
        picStauts:{
            validators:{
                notEmpty:{
                    message:"请上传3张图片",
                }
            }
        }
    }
  })

//6, 表单校验成功后, 会触发success.form.bv事件 , 会提交表单
   $("#form").on("success.form.bv", function( e ){
       e.preventDefault();
       var picData = $("#form").serialize();
       //还要拼接上图片的数据 
        // picStauts = "&key=value"
       picData += "&picArr=" + JSON.stringify(picArr);
    //    console.log(picData);
       $.ajax({
           url:"/product/addProduct",
           type:"post",
           data:picData,
           dataType:"json",
           success:function( info ){
            //    console.log( info );
            if( info.success){
                $("#prodModal").modal("hide");
                rander();
                //表单状态和内容重置
                $('#form').data("bootstrapValidator").resetForm(true);
                $("#drowText").text("请选择二级分类");
                $(".imgBox img").remove();
            }
           }
       })
   })
})