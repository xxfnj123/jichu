var that;

class Tab{
    constructor(id){
        //获取元素
        that = this;
        this.main = document.querySelector(id);
        this.add = this.main.querySelector('.tabadd');
        //li的父元素
        this.ul = this.main.querySelector('.fisrstnav ul:first-child');
        //section的父元素
        this.fsection = this.main.querySelector('.tabscon');
        this.init();
    }

    init(){
        this.updateNode();
        //init 初始化操作让相关的元素绑定事件
        this.add.onclick = this.addTab;
        for(var i=0;i<this.lis.length;i++){
            this.lis[i].index = i;
            this.lis[i].onclick = this.toggleTab;
            this.remove[i].onclick = this.removeTab;
            this.spans[i].ondblclick = this.editTab;
            this.sections[i].ondblclick = this.editTab;
        }
    }

    //获取所有的对应编号的元素
    updateNode(){
        this.lis = this.main.querySelectorAll('li');
        this.sections = this.main.querySelectorAll('section');
        this.remove = this.main.querySelectorAll('.icon-guanbi');
        this.spans = this.main.querySelectorAll('.fisrstnav li span:first-child');
        
    }

    //1.切换功能
    toggleTab(){
        //console.log(this.index);
        that.clearClass();
        this.className = 'liactive';
        that.sections[this.index].className = 'conactive';
    }

    //清除所有li和section的类
    clearClass(){
        for(var i=0;i<this.lis.length;i++){
            this.lis[i].className = '';
            this.sections[i].className = '';
        }
    }

    //2.添加功能
    addTab(){
        that.clearClass();
        //1.创建li元素和section元素
        var random = Math.random();
        var li = '<li class="liactive"><span>新选项卡</span><span class="iconfont icon-guanbi"></span></li>';
        var section = '<section class="conactive">测试 '+ random +'</section>';
        //2.把这两个元素追加到对应的父元素里面
        that.ul.insertAdjacentHTML('beforeend',li);
        that.fsection.insertAdjacentHTML('beforeend',section);
        that.init();
    }

    //3.删除功能
    removeTab(e){
        //阻止冒泡,防止触发li的点击切换事件
        e.stopPropagation();
        var index = this.parentNode.index;
        console.log(index);
        //根据索引号删除对应的li和section
        //remove()方法可以直接删除指定的元素
        that.lis[index].remove();
        that.sections[index].remove();
        that.init();
        //当我们删除的不是选定状态的li的时候，原来选中的li保持不变
        if(document.querySelector('.liactive')) return;
        //当我们删除了选中状态的li时，让它前一个li处于选中状态
        index--;
        //手动调用点击事件，不需要鼠标触发
        that.lis[index] && that.lis[index].click();

    }

    //4.修改功能
    editTab(){
        var str = this.innerHTML;
        //双击禁止选定文字
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        //生成文本框
        this.innerHTML = '<input type="text" />';
        var input = this.children[0];
        input.value = str;
        input.select();//让文本框里的文字处于选定状态
        //当我们离开文本框，就把文本框里的值给span
        input.onblur = function(){
            this.parentNode.innerHTML = this.value;
        };
        //按下回车也可以把文本框里面的内容赋值给span
        input.onkeyup = function(e){
            if(e.keyCode === 13){
                //手动调用表单失去焦点事件，不需要鼠标离开操作
                this.blur();
            }
        }
    }
}
new Tab('#tab');
