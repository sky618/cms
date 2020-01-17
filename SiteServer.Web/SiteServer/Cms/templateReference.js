﻿var $url = '/pages/cms/templateReference';

var data = {
  siteId: utils.getQueryInt("siteId"),
  pageLoad: false,
  loading: false,
  elements: null,
  elementPanel: false,
  elementTagName: '',
  elementTitle: '',
  elementFields: null
};

var methods = {
  apiList: function () {
    var $this = this;

    $api.get($url, {
      params: {
        siteId: this.siteId
      }
    }).then(function (response) {
      var res = response.data;

      $this.elements = res;
    }).catch(function (error) {
      utils.error($this, error);
    }).then(function () {
      $this.pageLoad = true;
    });
  },

  apiFields: function (element) {
    this.elementTagName = element.name;
    this.elementTitle = element.title;
    var $this = this;

    this.loading = this.$loading();
    $api.post($url, {
      siteId: this.siteId,
      elementName: element.elementName
    }).then(function (response) {
      var res = response.data;

      $this.elementPanel = true;
      $this.elementFields = res;
    }).catch(function (error) {
      utils.error($this, error);
    }).then(function () {
      $this.loading.close();
    });
  },

  getLinkUrl: function(name) {
    return 'https://www.siteserver.cn/docs/stl/' + name + '/';
  },

  getFieldLinkUrl: function(field) {
    return 'https://www.siteserver.cn/docs/stl/' + this.elementTagName + '/#' + field.name.toLowerCase() + '-' + field.title.toLowerCase();
  },

  btnElementSelectClick: function (element) {
    this.apiFields(element);
  },

  btnElementCancelClick: function () {
    this.elementPanel = false;
  }
};

new Vue({
  el: '#main',
  data: data,
  methods: methods,
  created: function () {
    this.apiList();
  }
});