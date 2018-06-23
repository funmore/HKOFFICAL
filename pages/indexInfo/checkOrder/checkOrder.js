var sha1=require('../../../utils/sha1.js');
var app=getApp();
var api = app.data.api;

Page({
  data: {
  	item:new Object(),
    originLength:0,
    destLength:0,
  	loadingHidden:false,
  	role:0,
    companyName:''
  },
  onLoad: function (query) {
			  //var id=query.id;
			  var that=this;
			  that.setData({
                    companyName:wx.getStorageSync('name'),
			              loadingHidden:false

			            });
			  if(wx.getStorageSync('role')=='company'){
			  	that.setData({
			  		role:0
			  	})
			  }else{
			  	that.setData({
			  		role:1
			  	})
			  }
              var timestamp = Date.parse(new Date());
              timestamp = timestamp / 1000;
              wx.request({
                  url: api + 'order/showOrderOne', //正吉url
                  data: {
                     token:wx.getStorageSync('token'),
                     t:timestamp,
                     s:sha1.hex_sha1(app.data.key+timestamp),

                     id:query.id

                  },
                  header: {
                      'content-type': 'application/json'
                  },
                  //method:'POST',
                  success: function(res) {
                    
                    if(res.data==0){   //单子被别人抢了
                        wx.showModal({
                        title: '订单出错',
                        content: '请重试',
                        showCancel: false
                      });

                    }else{
                      that.setData({
                      	item:res.data,
                        originLength:res.data.origin.length,
                        destLength:res.data.destination.length
                      })
                    }
                    that.setData({
                      loadingHidden:true
                    })
                  }
                })
        },
    calling:function(e){
      var type=parseInt(e.target.dataset.type);
      var phoneNum=0;
      if(type==1){ 
        phoneNum=this.data.item.mobilephone;      
      }else if(type==2){
        phoneNum=this.data.item.driverMobilephone;
      }else{
      }
      var isMatch=/\d{11}/.test(phoneNum);
      if(!isMatch){
          wx.showModal({
            title: '手机号非法！',
            content: '手机号非法，请联系12所调度',
            showCancel: false
          });
      }else{
        wx.makePhoneCall({
        phoneNumber: phoneNum 
        })
      }

    }
  
})