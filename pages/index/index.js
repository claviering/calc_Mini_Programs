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
    index:0,
    stack:[],
  },
  calc: function(e){
    var ch = e.target.id;
    switch(ch){
      case "=":
        this.equal();
        return;
      case "AC":
        this.data.str = "";
        this.change_res("0");        
        return;
      case "Del":
        this.data.str = this.data.str.slice(0, -1);
        if (this.data.str === ""){
          this.change_res("0");
        }
        else{
          this.change_res(this.data.str);
        }
        return;
      case "sin":
        this.data.str += ch+"(";
        break;
      case "cos":
        this.data.str += ch+"(";
        break;
      case "tan":
        this.data.str += ch+"(";
        break;
      case "lg":
        this.data.stack.push("lg");
        this.data.str += ch+"(";
        break;
      case "ln":
        this.data.stack.push("ln");
        this.data.str += ch+"(";
        break;
      case ")":
        if (this.data.stack.length > 0){
          var tmp = this.data.stack.pop();
          if (tmp === "lg"){
            this.data.str += ",10";
          }
          else if (tmp === "ln"){
            this.data.str += ",e";
          }
        }
        this.data.str += ")";
        break;
      case "sqr":
        this.data.str += "sqrt(";
        break;
      case "1/X":
        this.data.str = "1/(" + this.data.str+")";
        break;
      case "2nd":
        return;
        break;
      case "deg":
        return;
        break;
      default:
        this.data.str += ch;
    }
    this.change_res(this.data.str);    
    
  },
  equal: function(){
    this.data.str = this.data.str.replace(/lg/gi,"log");
    this.data.str = this.data.str.replace(/ln/gi,"log");
    var result = math.eval(this.data.str);
    this.change_res(result);
  },
  change_res:function(str){
    this.setData({res:str})
  },
  change_mode:function(){
    this.setData({tran_flag:!this.data.tran_flag});
    var tran_index = this.data.tran_flag ? 1 : 0;
    this.setData({index:tran_index});
  },
  run:function(){
    var str = "log(100,e)";
    console.log(math.eval(str));
  }
})
