//index.js
var math = require('./math.min.js')
//获取应用实例
const app = getApp()


Page({
  data: {
    items:["AC","Del","/","*","7","8","9","-","4","5","6","+","1","2","3","=","%","0","."],
    more_items_1:["2nd","deg","sin","cos","tan","^","lg","ln","(",")"],
    more_items_2:["sqr","!","1/X","PI","e"],
    str:"",
    res:"0",
    tran:["big","small"],
    tran_flag:0,
    index:0
  },
  tap: function(e){
    var ch = e.target.id;
    if(ch === "="){
      this.equal();
      return;
    }
    else if (ch === "AC"){
      this.change(0);
      this.data.str = "";
      this.change("0");
      return;
    }
    else if (ch === "Del"){
      this.data.str = this.data.str.slice(0, -1);
      if (this.data.str === ""){
        this.change("0");
      }
      else{
        this.change(this.data.str);
      }
      return;
    }
    this.data.str += ch;
    this.change(this.data.str);
  },
  equal: function(e){
    var result = math.eval(this.data.str);
    this.change(result);
  },
  change:function(str){
    this.setData({res:str})
  },
  tran_fun:function(){
    this.setData({tran_flag:!this.data.tran_flag});
    var tran_index = this.data.tran_flag ? 1 : 0;
    this.setData({index:tran_index});
  }
})
