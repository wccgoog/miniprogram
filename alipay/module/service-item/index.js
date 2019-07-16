import { connect } from 'herculex';

Component(connect({})({
  props: {
    type: 0,
    item: {},
    isEdit: false,
  },
  didMount() {
  },
  methods: {
    onItemClick(e) {
      if (this.props.isEdit) return null;
      this.dispatch('onUrlTap', e.target.dataset);
    },
    onEditClick(e) {
      if (!this.props.isEdit) return null;
    },
    addServiceItem(e) {
      let { item } = this.props;
      if (item.status === 1) {
        return;
      }
      this.dispatch('addServiceItem', item);
    },
  },
}));
