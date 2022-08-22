/*
* 定义一个函数，执行简单动画
* 参数：
* 		obj    		要执行动画的对象
* 		target 		执行动画的目标位置
* 		attr   		要执行动画的样式，比如：left top width height
* 		speed  		移动的速度（向左为负数，向右为正数）
* 		callback	回调函数，这个函数会在动画执行完毕之后再执行
* 
*/		
function move(obj , attr , target , speed , callback){
	//关闭上一个定时器
	clearInterval(obj.timer);
	
	//获取元素当前的位置
	var current = parseInt(getStyle(obj,attr));
	
	//判断速度的正负
	/*
	 * 如果从0向800px移动，则speed为正
	 * 如果从800px向0移动，则speed为负
	 * 
	 */
	if(current > target){
		//此时速度应为负值
		speed = -speed;
	}
	
	
	//开启一个定时器，用来执行动画效果
	//向执行动画的对象中添加一个timer属性，用来保存它自己的定时器的标识
	obj.timer = setInterval(function(){
			

		//获取box1原来的left值
		var oldValue = parseInt(getStyle(obj,attr));
			
		//在旧值的基础上，定义新值
		var newValue = oldValue + speed;
			
		//将新值设置给box1
		obj.style[attr] = newValue + "px";
			
		//向左移动，判断newValue是否小于target
		//向右移动，判断newValue是否大于target
		
		if((speed < 0 && newValue < target) || (speed > 0 && newValue > target)){
			newValue == target;
		}
			
		//当元素移动到0时，使其停止移动
		if(newValue == target){		
			clearInterval(obj.timer);	
			
			//动画执行完毕，调用回调函数
			callback() && callback();
			
		}
			
			
			
	},30);
}


/*
 * 定义一个函数，用来获取指定元素的当前的样式
 * 参数：
 * 		obj   要获取样式的元素
 * 		name  要获取的样式名
 * 
 * 
 */
function getStyle(obj , name){
	
	//优先用这种方法
	
	if(window.getComputedStyle){
		
		//IE8以上及其他浏览器，有getComputedStyle方法
		return getComputedStyle(obj,null)[name];
		
	}else{
		
		//IE8以下浏览器，没有getComputedStyle方法
		return obj.currentStyle[name];
		
	}
};