
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