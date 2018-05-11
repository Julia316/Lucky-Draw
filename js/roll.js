window.onload=function(){
	var oBtn=document.getElementById("btn");
	var oFcBtn=document.getElementById("fcbtn");
	var oRoll=document.getElementById("roll");
	var aImg=oRoll.getElementsByTagName("img");
	var oTc=document.getElementById("tc");
	var oTcIn=document.getElementById("tcIn");
	var oClose=document.getElementById("close");
	var oStock=document.getElementById("stock");
	
	
	var oDropL=document.getElementById("dropL");
	var oDropR=document.getElementById("dropR");
	var oRotate=document.getElementById("Rotate");	
	var oTcGlassL=document.getElementById("tcGlassL");
	var oTcGlassR=document.getElementById("tcGlassR");
	
	var timer=null;
	var num=null;	
	var nun=null;
	var dd=0;
	var oldTop=null;
	var oldTopAdd=null;
	var oldTopMin=null;	
	var onOff=true;
	
	var arr=["反弹股","强势股","潜力股","超跌股","反弹股","强势股","潜力股","超跌股"];
		
	oBtn.onclick=function roll(){
		if(onOff){		
        onOff=false;
		rmClass(this,"change");		
		var t=0;
		var m=-3.75;
		var rollTime=0;
		
		timer=setInterval(function(){
			t++;
			var dis=m+0.1*t;
			oRoll.style.left=dis+"rem";
			if(dis>=0){
				t=0;
				m=-7.5;
			}
		 },30)
//		rollTime=Math.round(Math.random()*1+1)*5625+10; //+10微调
        rollTime=562.5*6+18;
		setTimeout(function(rollTime){
			clearInterval(timer);
			chooseNum();
			function chooseNum(){
				num=Math.round(Math.random()*7);
				var L=aImg[num].getBoundingClientRect().left;			
				if(L<-50||L>270){
					console.log("不合格:"+num);
					chooseNum();
					
				}else{
					num=num;
					console.log("合格"+num);
				}
			}
			dd=num;
			oldTop=aImg[num].style.top;
			aImg[num].style.top=0+"rem";
			addClass(aImg[num],"shake");
			setTimeout(function(){
				oTc.style.display="block";	
				addClass(oTcIn,"ampl");
				oStock.innerHTML=arr[num];
				addClass(oTcGlassL,"tcShine");
				addClass(oTcGlassR,"tcShine");
				rmClass(oDropL,"dropL");
				rmClass(oDropR,"dropR");
				rmClass(oRotate,"rot");				
			},1200);
		},rollTime);
		}
	}
	oClose.onclick=function(){
		oTc.style.display="none";
		addClass(oBtn,"change");
		addClass(oDropL,"dropL");
		addClass(oDropR,"dropR");
		addClass(oRotate,"rot");
		rmClass(oTcIn,"ampl");
		aImg[dd].style.top=oldTop;
		rmClass(aImg[dd],"shake");	
		rmClass(oTcGlassL,"tcShine");
		rmClass(oTcGlassR,"tcShine");
		onOff=true;
	}	
	oFcBtn.onclick=function(){
		nun=Math.round(Math.random()*7);
        oTc.style.display="block";	
	    oStock.innerHTML=arr[nun];	
	    addClass(oTcIn,"ampl");
		addClass(oTcGlassL,"tcShine");
		addClass(oTcGlassR,"tcShine");	    
	}	
}




//添加和删除class
/////////////////////////////////////////////////////

function M(sele) {
	var first = sele.substr(0,1),
		isArr = sele.split(' ');
	if(first === '#' && isArr.length == 1){
		return document.getElementById(sele.substr(1));
	}else{
		var arr = Array.from(document.querySelectorAll(sele));
		return arr.length == 1 ? arr[0] : arr;
	}
}

// 判断某个元素是否包含某个class
function hasClass(obj,cls) {
	var re = new RegExp(`\\b${cls}\\b`);
	if(re.test(obj.className)){
		return true;
	}else{
		return false;
	}
}

// 添加class
function addClass(obj,cls) {
	if(!hasClass(obj,cls)){
		obj.className += ` ${cls}`;
	}
	obj.className = obj.className.trim();
}

// 删除class
function rmClass(obj,cls) {
	var re = new RegExp(`\\b${cls}\\b`);
	if(hasClass(obj,cls)){
		obj.className = obj.className.replace(re,'').replace(/\s{2}/,' ').trim();
	}
}
////////////////////////////////////////////////////////









