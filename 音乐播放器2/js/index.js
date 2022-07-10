var Audio=document.getElementById('audio');
// 获取audio的总时长
CurrentTime=document.getElementsByClassName('current-time')[0],//当前时间
AllTime=document.getElementsByClassName('all-time')[0],//总时间
Btn=document.getElementsByClassName('btn')[0],
Play=Btn.getElementsByClassName('iconfont')[0];
var timer,duration,width=232;//duration之所以要定义在这里(全局)，是因为后面都要用
ProActive=document.getElementsByClassName('pro-active')[0],
RadioBox=document.getElementsByClassName('radio-box')[0],
ProBox=document.getElementsByClassName('pro-box')[0];
upperMusic=document.getElementsByClassName('upper')[0];//上一首
nextMusic=document.getElementsByClassName('next')[0];//下一首
conTrolBox1=document.getElementsByClassName('control-box1')[0],
window.onload=function(){
    // console.log(this);
    CurrentTime.innerHTML=conversion(Audio.currentTime);//刚开始的时间为0
    AllTime.innerHTML=conversion(Audio.duration);
    duration=Audio.duration;
}
// 转换数字的函数00:00
function conversion(time){
    //秒,先取商，再取整
    var sec=parseInt(time%60)<10? '0'+parseInt(time%60):parseInt(time%60);
    //分，直接取整
    var min=parseInt(time/60)<10? '0'+parseInt(time/60):parseInt(time/60);
    return min+':'+sec;
}
//暂停与播放
Btn.onmouseup=function(){
    //判断当前音乐的状态
    if(Audio.paused){
        musicPlay();
    }else{
        musicPause();
    }
}
//进度条自动往前走，思路，让进度条往前走，只要改变他的宽度就好了
//通过计时器来获取音乐播放的时间
function movePro(){
    var currentTime=Audio.currentTime;
    // console.log(currentTime);
    CurrentTime.innerHTML=conversion(currentTime);//时间也在向前走
    ProActive.style.width=currentTime/duration*width+10+'px';
}
//当前的时长(currenttime)/总时长(duration)*总宽度(allWidth)=当前进度条的宽度(width)
//播放到最后的事件
Audio.onended=function(){
     //先暂停
     musicPause();
     CurrentTime.innerHTML=conversion(0);
     ProActive.style.width=10+'px';
     Audio.currentTime=0;
     //再次播放
     musicPlay();
}
function musicPlay(){
    Audio.play();
    Play.className='iconfont icon-zanting';
    timer=setInterval(movePro,200);//200是为了让计数器更精准
}
function musicPause(){
    Audio.pause();
    Play.className='iconfont icon-bofang';
    clearInterval(timer);//暂停的时候清理计时器
}
//鼠标按下的执行拖拽功能
RadioBox.onmousedown=function(){
    var c=Audio.currentTime;
    //鼠标再body周围的区域移动都可以
    document.body.onmousemove=function(e){
        //鼠标的位置
        var newWidth=e.clientX-ProBox.getBoundingClientRect().left;//getBoundingClientRect()返回的是当前元素距离浏览器左侧的值
        //width的范围
        if(newWidth<8){
            newWidth=8;
        }else if(newWidth>240){
            newWidth=240;
        }
        ProActive.style.width=newWidth+'px';//进度条的宽度
        //currenttime的时间
        c=(newWidth-8)/width*duration;
        // Audio.currentTime=c;//给currentTime设置的时间，在移动的时候不设置current，只设置字的变化
        CurrentTime.innerHTML=conversion(c);//给文字
    }
    //鼠标再body周围的区域向下按动都可以
    document.body.onmouseup=function(){
        document.body.onmousemove=null;//当鼠标抬起的时候要让鼠标移动的事件为空
        document.body.onmouseup=null;//也要取消，不然每次up的时候都会触发
        Audio.currentTime=c;
        musicPlay();
    }
}



