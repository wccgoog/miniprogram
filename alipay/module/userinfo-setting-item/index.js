import { connect } from 'herculex';

Component(connect({})({
  props: {
    name: '',
    itemValue: '',
    isEditable: false,
    navigateType: '',
    imgSrc: '',
  },
  methods: {
    navigateTonewUrl(e) {
      if (this.props.navigateType === 'email') {
        this.dispatch('goToModifyMail');
      } else if (this.props.navigateType === 'address') {
        this.dispatch('goToModifyAddress');
      }
    },
  },
}));
