import { connect } from 'herculex';
import { vefifyEmail } from '../../utils/index';

Component(connect({
  mapStateToProps: {
    placeName: (state, getters, global) => {
      let tipObj = {
        name: '邮箱',
        ph: '请输入邮箱',
      };
      if (state.modifyType === 'address') {
        tipObj.name = '地址';
        tipObj.ph = '请输入地址';
      }
      return tipObj;
    },
    //  修改邮箱还是地址
    modifyType: (state) => {
      return state.modifyType;
    },
    userInfo: (state) => {
      return state.$global.userInfo;
    },
    inputValue: (state) => {
      return state.inputValue;
    },
    vefifyEmailIsOk(state) {
      let bool = true;
      if (!state.inputValue) {
        return bool;
      }
      if (state.modifyType === 'email') {
        bool = vefifyEmail(state.inputValue);
      }
      return bool;
    },
    isConfirmSubmit: (state) => {
      return state.isConfirmSubmit;
    },
  },
}

)({
  data: {

  },
  didMount() {
  },

  methods: {
    onInput(e) {
      this.dispatch('saveOnIputValue', { inputValue: e.detail.value });
    },
    addNewValue(e) {
      let trimValue = this.data.inputValue;
      let { modifyType } = this.data;
      let { uid } = this.data.userInfo;
      let parms = {
        uid,
        email: this.data.userInfo.email,
        address: this.data.userInfo.address,
      };
      if (!this.data.vefifyEmailIsOk) {
        my.showToast({
          content: '邮箱格式不对',
        });
        return;
      }
      if (modifyType === 'email') {
        parms.email = trimValue;
      } else {
        parms.address = trimValue;
      }
      this.dispatch('modifyisConfirmSubmitValue');
      this.dispatch('actionModifyUserInfo', parms);
    },
  },
}));
