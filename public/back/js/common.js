
//使用进度条插件 , 
//添加进度条效果:
//1, 在第一个ajax请求发送时. 开启进度条
//2, 在所有的ajax请求完成时, 结束进度条

$(document).ajaxStart( function(){
    //开启进度条
    NProgress.start();
})

$(document).ajaxStop( function(){
    //结束进度条
setInterval( function(){
    NProgress.done();
},2000)
  
})

//入口函数 , 点击category导航中的a 时 , 进行切换current类
$(function(){
    $(".as_category .cate_nav").on("click",function(){
        //切换下一个兄弟元素 显示隐藏
        $(this).next().slideToggle();
    })
})


// 右侧头部按钮功能
//功能1: 点击logout, 模态框出现
$(function(){
    $(".logout").on("click",function(){
        $("#logoutModal").modal("show");
    })


//功能2: 点击btn_logout退出按钮 , 发送ajax请求
   $(".btn_logout").on("click",function(){

      $.ajax({
          url:"/employee/employeeLogout",
          type:"get",
          dataType:"json",
          success:function( info ){
            if(info.success){
              //退出成功 , 跳转到登录页
              location.href = "login.html";
            }
          }
      })
   })


   // 功能3: 点击menus 按钮 , 左侧lt_aside 进行显示或隐藏
   $(".menus").on("click",function(){
       $(".lt_aside").toggleClass("hidemenu");
       $(".content_top").toggleClass("hidemeun");
       $(".lt_content").toggleClass("hidemenu");
   })

})


