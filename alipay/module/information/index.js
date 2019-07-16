import { connect } from 'herculex';

Component(connect({
  mapStateToProps: ['noticeInfo'],
})({
  methods: {
    /**
     * 外跳H5申请
     */
    onNoticeClick() {
      const { noticeInfo } = this.data;
      const { url } = noticeInfo;

      my.call('startApp', {
        appId: '20000067',
        param: {
          url,
        },
      }, (param) => {
        console.log('start app 外跳h5，需要联系业务方申请权限');
      });
    },
  },
}));
