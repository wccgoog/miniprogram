
import { matchUrl, navigateToRightUrl, regHttpRequest, getUid } from '../../utils/index';

export default {
  onGoToMyCard(e) {
    if (!e.target.dataset.url) {
      return null;
    };
    // let type = e.target.dataset.type;
    let url = e.target.dataset.url;
    // let appId = e.target.dataset.appId;
    let params = {

    };
    // console.log(e);
    let bool = regHttpRequest(url);
    if (bool) {
      let uid = getUid();
      params.url = url;
      params.type = 'H5';
      params.uid = uid;
      navigateToRightUrl(params);
    } else {
      my.navigateTo({
        url: matchUrl(url),
      });
    }
  },
};
