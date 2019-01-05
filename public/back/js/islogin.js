

//需求:登录拦截 , 在用户进入页面时, 先发送ajax给后台 , 看用户是否有登录过 , 
 // 若是登录 则继续访问 , 若是没有登录 跳转到login页面 登录
 $(function(){
     //发送ajax请求
     $.ajax({
         url:"/employee/checkRootLogin",
         type:"get",
         dataType:"json",
         success:function( info ){
            console.log(info);
            if( info.success){
              //继续访问
              console.log("当前用户已登录");
            }
            if(info.error === 400){
                //未登录
                location.href="login.html";
            }
         }
     })
 })