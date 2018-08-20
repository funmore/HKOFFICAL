var sha1=require('../../utils/sha1.js');
var currentDT=require('../../utils/currentDT.js');
var app=getApp();
var api = app.data.api;
// var origin=require('../orderInfo/origin/origin.js');
Page({
  data: {
    date: '',
    time: '',
    array_yongCheLeiXing:['管理','型号','研制'],
    index_yongCheLeiXing: 0,
    index_isOffWorkTime:0,
    index_isCity:0,

    array_carType:['客车','货车'],
    index_carType:0,

    array_van:['厢车','敞车','客货两用'],
    index_van:0,

    array_isleader:['否','是'],
    index_isleader:0,

    array_reasons:['型号科研生产','靶场试验任务保障','执纪','离退休干部服务','接待','应急','机要通信','涉密载体销毁押运','财务提款运钞','普通公务'],
    index_reasons:0,

    leaders:new Array(),
    index_oneOrTwoWay: 0,
    array_manager:new Array(),
    index_manager:0,

    reason:'',
    workers:'',
    origin:new Array(),
    dest:new Array(),

    applyer:wx.getStorageSync('name'),
    passenger:'',
    passengerTel:'',
    notes:'',
    originStyle:'',
    destStyle:'',
    reasonStyle:'',
    passengerStyle:'',
    passengerNumStyle:'',
    passengerTelStyle:'',
    leadersStyle:'',
    managerStyle:'',

    passengerNum:0

  },
  onLoad:function(e) {
    // Do some initialize when page load.

  },
  onShow:function(e){
      if(wx.getStorageSync('role')=='company'){
              wx.showModal({
                        title: '无信息',
                        content: '您尚不具有员工权限',
                        showCancel: false,
                        success:function(e){
                  
                          wx.switchTab({
                            url: '../company/company'
                          })
                        }
                      });
      }
      if(this.data.origin.length!=0){
              this.setData({
                originStyle:''
              })
            }
      if(this.data.dest.length!=0){
        this.setData({
          destStyle:''
        })
      }
      var isLeadersNull=this.data.leaders.length==0&&this.data.index_isleader==1
      if(!isLeadersNull){
        this.setData({
          leadersStyle:''
        })
      }

  },
  OnLongPress:function(e){
      var id=e.currentTarget.id;
      var title=null;
      var content=null;
      if(id=="sixDis"){
          title="什么是城六区？";
          content="东城/西城/海淀/朝阳/石景山/大兴/首都机场";
      }
      wx.showModal({
        title: title,
        content:content,
        showCancel:false,
      });

  },
  getManager(){
      var that =this;
      var timestamp = Date.parse(new Date());
              timestamp = timestamp / 1000;
              wx.request({
                  url: api + 'employee/getManager', //正吉url 获取订单
                  data: {
                     token:wx.getStorageSync('token'),
                     t:timestamp,
                     s:sha1.hex_sha1(app.data.key+timestamp)                   
                  },
                  header: {
                      'content-type': 'application/json'
                  },
                  //method:'GET',
                  success: function(res) {
                    //处理订单code
                    that.setData({
                      array_manager: res.data
                    });
                  }
                });
  },
  onLoad:function(e){
    this.getManager();
    var current_time=new Date();
    var yyyy_mm_dd=currentDT.currentDate(current_time);
    var hh_mm=currentDT.currentTime(current_time);
    this.setData({
      date:yyyy_mm_dd,
      time:hh_mm
    });
    this.setData({
      applyer:wx.getStorageSync('name')
    })

  },
  applyerInput:function(e){
    this.setData({
      applyer:e.detail.value
    })
  },
  // reasonInput:function(e){
  //   this.setData({
  //     reason:e.detail.value
  //   })
  //   if(this.data.reasonStyle!=''){
  //     this.setData({
  //       reasonStyle:''
  //     })
  //   }
  // },
  bindPickerManagerChange:function(e){
    this.setData({
      index_manager:e.detail.value
    });
    if(this.data.index_manager!=0){
      this.setData({
         managerStyle:''
      })
    }
  },
  bindPickerReasonsChange:function(e){
    this.setData({
      index_reasons:e.detail.value
    })
  },
  passengerInput:function(e){
    this.setData({
      passenger:e.detail.value
    })
    if(this.data.passengerInput!=''){
      this.setData({
        passengerStyle:''
      })
    }
  },
  minus:function(e){
    var passengerNum=this.data.passengerNum;
    if(!passengerNum){

    }else{
    this.setData({
      passengerNum:passengerNum-1
    })
    }
  },
  plus:function(e){
    var passengerNum=this.data.passengerNum;
    this.setData({
      passengerNum:passengerNum+1
    })
    var isPassengerNum=this.checkPassengerNum();
    if(isPassengerNum==true){
      this.setData({
        passengerNumStyle:''
      })
    }
  },
  passengerTelInput:function(e){
    this.setData({
      passengerTel:e.detail.value
    })
    if(this.data.passengerTelInput!=''){
      this.setData({
        passengerTelStyle:''
      })
    }
  },

  notesInput:function(e){
    this.setData({
      notes:e.detail.value
    })
  },

  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function(e) {
    this.setData({
      time: e.detail.value
    })
  },

  bindPickerYongcheleixingChange: function(e) {
    this.setData({
      index_yongCheLeiXing: e.detail.value
    })
  },
  bindCarChange:function(e){
    this.setData({
      index_carType:e.detail.value
    })
  },
  bindVanChange:function(e){
    this.setData({
      index_van:e.detail.value
    })
  },
  bindIsLeaderChange:function(e){
    this.setData({
      index_isleader:e.detail.value
    })
  },
  switchOneOrTwoWayChange: function(e) {
    var index=0;
    if(e.detail.value){
      index=1;
    }else{
      index=0;
    }
    this.setData({
      index_oneOrTwoWay: index
    })
  },
  switchIsCityChange:function(e){
    var index=0;
    if(e.detail.value){
      index=1;
    }else{
      index=0;
    }
    this.setData({
      index_isCity:index
    })
  },
  switchIsOffWorkTimeChange:function(e){
    var index=0;
    if(e.detail.value){
      index=1;
    }else{
      index=0;
    }
    this.setData({
      index_isOffWorkTime:index
    })
  },
  bindWorkerNeedsInput: function(e) {
    this.setData({
      workers: e.detail.value
    })
  },
    checkPassengerNum(){
        var isPassengerNum=true;
        if(this.data.index_isCity==1){
          if(this.data.passengerNum<4)
            isPassengerNum=false;
        }else{
          if(this.data.passengerNum<1)
            isPassengerNum=false;
        }
        return isPassengerNum;
  },
  checkInput(){
    var errorMessage=new Array();
    errorMessage[0]="非城六区出行至少1人";
    errorMessage[1]="城六区出行至少4人";
    errorMessage[2]="所领导未选择";
    errorMessage[3]="出发地为空";
    errorMessage[4]="目的地为空";
    errorMessage[5]="乘车联系人至少填写一个";
    errorMessage[6]="手机号填写不合法";
    errorMessage[7]="未选择型号助理员";
    var errorMessageToShow =new Array();


    if(!this.data.origin.length){
      errorMessageToShow.push(errorMessage[3]);
      this.setData({
        originStyle:'1rpx solid red'
      })
    }else{
      this.setData({
        originStyle:''
      })
    }
    if(!this.data.dest.length){
      errorMessageToShow.push(errorMessage[4]);
        this.setData({
        destStyle:'1rpx solid red'
      })
    }else{
      this.setData({
        destStyle:''
      })
    }

    if(this.data.passenger==''){
      errorMessageToShow.push(errorMessage[5]);
        this.setData({
          passengerStyle:'1rpx solid red'
        })
    }else{
      this.setData({
          passengerStyle:''
        })
    }

    var isPassengerNum=true;
    if(this.data.index_isCity==0){
      if(this.data.passengerNum<1){
        isPassengerNum=false;
        errorMessageToShow.push(errorMessage[0]);
      }
    }else{
      if(this.data.passengerNum<4){
        isPassengerNum=false;
        errorMessageToShow.push(errorMessage[1]);
      }
    }

    if(isPassengerNum==false){

      this.setData({
        passengerNumStyle:'1rpx solid red'
      })
    }

    var isLeadersNull=this.data.leaders.length==0&&this.data.index_isleader==1;
    if(isLeadersNull){
      errorMessageToShow.push(errorMessage[2]);
      this.setData({
        leadersStyle:'1rpx solid red'
      })
    }else{
      this.setData({
        leadersStyle:''
      })
    }
    var isManagerSelected=true;
    if(this.data.index_yongCheLeiXing==1&&this.data.index_manager==0){
        isManagerSelected=false;
        errorMessageToShow.push(errorMessage[7]);
        this.setData({
        managerStyle:'1rpx solid red'
      })
    }else{
      this.setData({
        managerStyle:''
      })
    }
    //查看电话号码是否符合11位
    
    var isMatch=/\d{11}/.test(this.data.passengerTel);
    if(!isMatch){
        errorMessageToShow.push(errorMessage[6]);
        this.setData({
          passengerTelStyle:'1rpx solid red'
        })
    }else{
      this.setData({
          passengerTelStyle:''
        })
    }
    if(!isLeadersNull&&this.data.origin.length&&this.data.dest.length&&this.data.passenger!=''&&isMatch&&isManagerSelected&&isPassengerNum){
      return true;
    }else{
      var content=errorMessageToShow.join("/");
      wx.showModal({
            title: '申请信息有误',
            content: content,
            showCancel: false
          });
      return false;
    }
  },
  applyForCar:function(e){
    var formId = e.detail.formId;
    var data=this.data;
    var that=this;
    if(data.passengerNum>=2){
        var passenger=data.passenger+'等'+String(data.passengerNum)+'人';
    }else{
        var passenger=data.passenger;
    }

    wx.showModal({
        content: '确定提交用车申请？',
        success: function(res) {
            if(res.confirm&&that.checkInput()){

              var timestamp = Date.parse(new Date());
              timestamp = timestamp / 1000;
              var originStr=JSON.stringify(data.origin);
              var destStr=JSON.stringify(data.dest);
              var leadersStr=data.index_isleader==1 ?  JSON.stringify(data.leaders):null;
              var manager=(data.index_yongCheLeiXing==1? data.array_manager[data.index_manager].id:2000);
              var van=(data.index_carType==1 ? data.array_van[data.index_van]:'');
              wx.request({
                  url: api + 'order/create', //正吉url
                  data: {
                     token:wx.getStorageSync('token'),
                     t:timestamp,
                     s:sha1.hex_sha1(app.data.key+timestamp),
                     
                     usetime:data.date+' '+data.time+':00',
                     type:data.index_yongCheLeiXing,
                     manager:manager,
                     reason: data.array_reasons[data.index_reasons],   //补全
                     passenger:passenger,
                     mobilephone:data.passengerTel,
                     isweekend:data.index_isOffWorkTime,
                     isreturn:data.index_oneOrTwoWay,
                     workers:data.workers,
                     iscity:data.index_isCity,

                     isVan:data.index_carType,
                     vanType:van,
                     isLeader:data.index_isleader,
                     leaderInfo:leadersStr,

                     origin:originStr,
                     dest:destStr,
                     remark:data.notes,
                     formId:formId
                  },
                  header: {
                      'content-type': 'application/json'
                  },
                  //method:'POST',
                  success: function(res) {
                    if(res.data.state==10){
                      
                      wx.redirectTo({
                            url: '../orderInfo/orderSuccess/orderSuccess',
                            fail:function(e){
                              wx.redirectTo({
                                url:'../orderInfo/orderFail/orderFail'
                              })
                            }
                          })
                    }else{
                      wx.showToast({
                        title: '申请订单失败',
                        icon: 'warn',
                        duration: 1000
                      });
                      wx.switchTab({
                        url: '../order/order'
                      });
                    }
                  }
                })
            }
        }
    });
    
  }
})


          
          
