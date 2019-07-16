import { connect } from 'herculex';
import { navigateToRightUrl, getUid } from '../../utils/index';

Component(connect({
  mapStateToProps: {
    asyncOver: (state) => state.msgListOver,
    messageList: (state) => {
      if (state.messageList.length > 0) {
        state.messageList.forEach((item, i) => {
          if (item.extendParams && item.extendParams.length > 0 && JSON.parse(item.extendParams).url) {
            item.showUrl = true;
          }
        });
      }
      return state.messageList;
    },
    bottomMsg: (state) => state.bottomMsg,
  },
})({
  props: {},
  methods: {
    msgDetail(e) {
      let showUrl = e.target.dataset.showurl;
      if (!showUrl) {
        return;
      }
      let url = JSON.parse(e.target.dataset.url).url || '';
      if (url) {
        let uid = getUid();
        navigateToRightUrl({
          uid,
          url,
          type: 'H5',
        });
      }
      // console.log(url);
    },
    refresh() {
      this.dispatch('refreshMessageData');
    },
  },
}));
