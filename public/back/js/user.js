

//需求: 1, 在已进入页面时 , 就要发送ajax请求 , 请求数据渲染到页面上
$(function(){
    var currentPage = 1;

    rander();
    function rander(){
        //发送请求
        $.ajax({
            url:"/user/queryUser",
            type:"get",
            data: {
                page: currentPage,
                pageSize: 5
            },
            dataType:"json",
            success:function( info ){
                console.log( info );
                //接收到的数据 使用模板引擎渲染
                var  htmlStr = template( "userId" , info);
                $("tbody").html(htmlStr); //渲染页面
    
             //使用分页插件, 渲染分页
              $(".user_page").bootstrapPaginator({
                  bootstrapMajorVersion:3,
                  //当前页
                  currentPage : info.page,
                  //总页数
                  totalPages : Math.ceil( info.total/info.size ), 
                  //点击页数时触发的函数
                  onPageClicked:function( a , b , c , page){
                        currentPage = page;
                        //保存当前页 , 然后重新渲染
                        rander();
                  }
              })
            }
        })
    }

//2, 点击禁用/启用 按钮 , 模态框显示 , 由于tr是动态创建的 , 所以要使用事件委托 注册事件
  var  currentId;
  var  isDelete;
  $("tbody").on("click",".btn", function(){
        //获取指定要更改的id 及当前按钮的状态
         currentId = $(this).parent().attr("data-id");
        //禁用按钮 ? 禁用状态0 : 启用状态 1;
        isDelete = $(this).hasClass("btn-danger")? 0 : 1;

        $("#userModal").modal("show");
      
      //点击确定按钮时 , 发送ajax请求
      $(".btn_user").on("click" , function(){

          $.ajax({
              url:"/user/updateUser",
              type:"post",
              data:{
                  id : currentId,
                  isDelete : isDelete,
              },
              dataType:"json",
              success:function( info ){
                //   console.log( info );
                  if( info.success){
                      //模态框隐藏 , 页面重新渲染
                      $("#userModal").modal("hide");
                      rander();
                  }
              }
          })
      })
  })
})