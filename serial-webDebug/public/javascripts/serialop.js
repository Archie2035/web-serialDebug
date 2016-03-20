var queryTimer;
function querySerialData() {
    queryTimer = setInterval(function(){
        $.ajax({
            url: "/querySerialData",
            type: "get",
            dataType: "json",
            success: function (result) {
                if(result["serialData"]){
                    $('#serialDisplay').append("[接收]"+result["serialData"]+'\n');
                    var scrollTop = $("#serialDisplay")[0].scrollHeight;
                    $("#serialDisplay").scrollTop(scrollTop);
                }else{

                }
            }
        });
    },1000);
}
function stopQuerySerialData(){
    clearInterval(queryTimer);
}
$(function () {
    $('#sendButton').click(function(){
        $.ajax({
            url: "/serialSend",
            type: "post",
            dataType: "json",
            data:{'data':$('#serialInputData').val()},
            beforeSend: function () {
                $('#serialDisplay').append("[发送]"+$('#serialInputData').val()+'\n');
            },
            success: function (result) {
                if (result) {
                } else {
                    alert("sorry send faild");
                }
            },
            error: function () {
                alert("send data error!");
            }
        });
    });
    $('#openSerial').click(function () {
        $.ajax({
            url: "/serialStart",
            type: "post",
            dataType: "json",
            data:{'com':$('#devicecom option:selected').val()},
            beforeSend: function () {
                $('#serialDisplay').append("[info]正在请求打开该串口...\n");
            },
            success: function (result) {
                if (result["serialOpen"] == 'OK') {
                    $('#serialDisplay').append(result["serialOpen"] + '\n');
                    querySerialData();
                } else {
                    alert("sorry");
                }
            },
            error: function () {
                alert("ajax query error!");//执行
            }
        });
    });

    $('#closeSerial').click(function () {

        $.ajax({
            url: "/serialStop",
            type: "get",
            dataType: "json",
            beforeSend: function () {
                $('#serialDisplay').append("[info]正在请求关闭该串口...\n");
            },
            success: function (result) {
                if (result["serialStop"] == 'OK') {
                    $('#serialDisplay').append(result["serialStop"] + '\n');
                    stopQuerySerialData();
                } else {
                    alert("sorry");
                }
            },
            error: function () {
                alert("ajax query error!");//执行
            }
        });

    });

});
