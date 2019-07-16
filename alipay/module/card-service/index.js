import { connect } from 'herculex';

Component(connect({})({
  props: {
    serviceInfo: {},
  },
  methods: {
    onItemClick(e) {
      this.dispatch('onUrlTap', e.target.dataset.link);
    },
  },
}));
