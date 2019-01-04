
// 功能1: 使用bootstrap-validator插件 , 进行表单校验
$(function(){

    $("#form").bootstrapValidator({
        //配置图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
          },
        // 指定校验的字段
        fields:{
            username:{
                //校验的规范
               validators:{
                 //非空
                  notEmpty:{
                      message:"用户名不能为空"
                  },
                  //长度
                 stringLength:{
                    min:2,
                    max:6,
                    message:"用户名长度必须在2-6位"
                  }
                },
               //表单校验, 更新校验状态的回调函数
               callback:{
                  message:"用户名错误"
               }
            },

            password:{
              validators:{
                  notEmpty:{
                      message:"密码不能为空",
                  },
                  stringLength:{
                      min:6,
                      max:12,
                     message:"密码长度6-12位"
                  },
                 //表单校验 , 校验状态的回调函数
                 callback:{
                     message:"密码错误",
                 }
                }
            }
        }
    })
    
// 功能2:在输入用户名和密码时 , 表单校验成功后会触发success.form.bv事件, 点击登录按钮时 , 发送ajax请求
   $("#form").on("success.form.bv", function( e ){
       //阻止a标签的跳转
       e.preventDefault();
       //发送ajax请求
       $.ajax({
           url:"/employee/employeeLogin",
           type:"post",
           data:$("#form").serialize(),
           dataType:"json",
           success:function( info ){
            //    console.log( info );

            if(info.success){
                //登录成功 跳转首页 (因为是在本地访问 , 为了让进度条显示的更明显 , 所有添加了延时器)
                setTimeout(function() {
                    location.href="index.html";
                },500)
                return;

            }else if(info.error == 1000){
                // alert("用户名不存在")
                //调用插件实例化方法 , 更新校验状态失败 , 提示用户 
                //  updateStatus方法中的参数有三个: 校验的字段 , 校验状态 , 校验提示内容
                $("form").data("bootstrapValidator").updateStatus( "username" ,"INVALID" , "callback");
                return;

            }else if(info.error == 1001){
                // alert("密码错误");
                $("form").data("bootstrapValidator").updateStatus( "username" ,"INVALID" , "callback");
                return;
            }
           }
       })
   })

   //功能3: 点击重置按钮时 , 表单内容和提示状态都要重置
     //但 type="reset" 属性的按钮 , 只会重置内容 ,
     // 所以要使用插件实例化的方法  resetForm()

     $('[type="reset"]').on("click", function(){
        $("form").data("bootstrapValidator").resetFrom(); 
     })



});
