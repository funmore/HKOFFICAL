

Page({
  data: {
    leaders:new Array(),
    items: [
      {name: 'a', value: '马卫华'},
      {name: 'b', value: '栾健'},
      {name: 'c', value: '杨东山'},
      {name: 'd', value: '曾思'},
      {name: 'e', value: '王帅'},
      {name: 'f', value: '李德武'},
      {name: 'g', value: '杨文军'},
      {name: 'h', value: '刘靖'},
      {name: 'i', value: '王知非'},
      {name: 'j', value: '禹春梅' },
      {name: 'k', value: '李磊' },
      {name: 'l', value: '王大勇' }
      
    ]
  },

    onShow:function(options){
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
  },
   checkboxChange: function(e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);
    this.setData({
      leaders:e.detail.value
    })
    console.log('radio发生change事件，携带value值为：', this.data.leaders);

  },

 

  onUnload:function(e){
        var pages = getCurrentPages();
        var currPage = pages[pages.length - 1];   //当前页面
        var prevPage = pages[pages.length - 2];  //上一个页面
        prevPage.setData({
          leaders: currPage.data.leaders
        });
  },

  saveAndBack:function(e){

        var pages = getCurrentPages();
        var currPage = pages[pages.length - 1];   //当前页面
        var prevPage = pages[pages.length - 2];  //上一个页面
        prevPage.setData({
          leaders: currPage.data.leaders
        });
        wx.navigateBack({
            delta: 1
          });
      }

}) 



