
import Store from 'herculex';
import { globalData } from '../../config';
import { getMessageList } from '../../services/message-list';

const dateChange = (o) => {
  const date = o.gmtCreate ? o.gmtCreate : '';
  let dateArr = date.split(' ');
  let ym = dateArr[0].substring(5);
  let tm = dateArr[1].substring(0, 5);
  o.gmtCreate = [ym, tm];
};

const getObj = (obj) => {
  const o = {};
  let arg = typeof obj === 'string' ? JSON.parse(obj) : obj || {};
  Object.keys(arg).map(item => {
    o[item] = arg[item];
  });
  dateChange(o);
  return o;
};

export default new Store({
  connectGlobal: true,
  state: {
    // 防止闪屏
    msgListOver: false,
    // 消息列表
    messageList: [],
    // 消息列表底部显示文字
    bottomMsg: false,
    // 共多少条数据
    total: 0,
    // 分页
    pageInfo: {
      // 当前页
      pageNo: 0,
      // 每页条数
      pageSize: 20,
      // 渠道标识
      channelType: 'OWNER_MSG',
      // userid
      receiverAccount: '',
    },
  },
  getters: {
    messageGetters: (state) => state.messageList,
  },
  mutations: {
    BOTTOM_MSG(state, payload) {
      const { pageNo, pageSize } = state.pageInfo;
      state.total = payload.total || 0;
      state.bottomMsg = state.total <= (pageNo * pageSize);
    },
    // 处理请求数据
    REQUEST_DATA(state, payload) {
      state.pageInfo.pageNo = payload ? ++state.pageInfo.pageNo : 1;
    },
  },
  actions: {
    initPageNo({ commit, state, dispatch, global }) {
      commit('xxxmutation', {
        pageInfo: {
          pageNo: 0,
          pageSize: 20,
          channelType: 'OWNER_MSG',
          receiverAccount: '',
        },
      });
    },
    async loadMessageData({ commit, state, dispatch, global }, payload = {}) {
      // 请求数据前（可添加loading）--- 防止闪屏
      commit('xxxmutation', { msgListOver: false });
      // 是否翻页
      commit('REQUEST_DATA', payload.turing);

      const { userInfo } = global;

      // 请求数据{ "receiverAccount": "201811091101000407584069" }
      const requestData = Object.assign({}, state.pageInfo, { receiverAccount: userInfo.uid });
      // 返回值
      const response = await getMessageList(requestData);
      // 转换列表
      const list = response.rows.map(item => getObj(item.bizContent));

      // 是否是翻页请求
      if (payload.turing) {
        // // 合并消息列表
        commit('xxxmutation', { messageList: [...state.messageList, ...list] });
      } else {
        commit('xxxmutation', { messageList: [...list] });
      }
      // 数据总条数 计算---页面底部显示文字（分页）
      commit('BOTTOM_MSG', { total: response.total });
      // // 请求数据后
      commit('xxxmutation', { msgListOver: true });
      setTimeout(() => {
        my.stopPullDownRefresh();
      }, 500);
    },
    async refreshMessageData({ commit, state, dispatch, global }, payload = {}) {
      // 请求数据前（可添加loading）--- 防止闪屏
      commit('xxxmutation', { msgListOver: false });
      // 是否翻页
      // commit('REQUEST_DATA', payload.turing);
      const { userInfo } = global;

      // 请求数据
      const requestData = Object.assign({}, state.pageInfo, { receiverAccount: userInfo.uid }, { pageNo: 1 });
      // 返回值
      const response = await getMessageList(requestData);
      // 转换列表
      const list = response.rows.map(item => getObj(item.bizContent));

      // 是否是翻页请求
      if (payload.turing) {
        // // 合并消息列表
        commit('xxxmutation', { messageList: [...state.messageList, ...list] });
      } else {
        commit('xxxmutation', { messageList: [...list] });
      }
      // 数据总条数 计算---页面底部显示文字（分页）
      commit('BOTTOM_MSG', { total: response.total });
      // // 请求数据后
      commit('xxxmutation', { msgListOver: true });
      setTimeout(() => {
        my.stopPullDownRefresh();
      }, 500);
    },

    // 模拟空数据
    async loadMessageNull({ commit }) {
      commit('xxxmutation', { msgListOver: false });
      commit('xxxmutation', { messageList: [] });
      commit('xxxmutation', { msgListOver: true });
    },
  },
});
