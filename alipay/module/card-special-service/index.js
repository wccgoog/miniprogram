import { connect } from 'herculex';

Component(connect({})({
  props: {
    spectialServiceInfo: {},
  },
  methods: {
    onItemClick(e) {
      this.dispatch('onUrlTap', e.target.dataset.link);
    },
  },
}));
