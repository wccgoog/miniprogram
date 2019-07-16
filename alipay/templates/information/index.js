import { matchUrl, navigateToRightUrl, getUid } from '../../utils/index';

export default {
  onNoticeClick(e) {
    let type = e.target.dataset.type;
    let url = e.target.dataset.url;
    let appId = e.target.dataset.appId;
    let uid = getUid();
    let params = {
      type: 'H5',
      url,
      appId,
      uid,
    };
    navigateToRightUrl(params);
  },
};
