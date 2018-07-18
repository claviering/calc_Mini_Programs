//index.js
var math = require('./math.min.js')
//获取应用实例
const app = getApp()


Page({
  data: {
    items:["AC","Del","/","*","7","8","9","-","4","5","6","+","1","2","3","=","%","0","."],
    str:"",
    res:"0",
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
  }
})
