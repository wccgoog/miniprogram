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
      this.dispatch('onUrlTap', e.target.dataset.link);
    },
    onEditClick(e) {
      if (!this.props.isEdit) return null;
    },
    removeSingleService(e) {
      let { id } = e.target.dataset;
      this.dispatch('removeServiceItem', id);
    },
  },
}));
