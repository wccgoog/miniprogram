import { connect } from 'herculex';

Component(connect({})({
  props: {
    title: {},
  },
  methods: {
    onRightClick(e) {
      this.dispatch('onUrlTap', e.target.dataset.link);
    },
  },
}));
