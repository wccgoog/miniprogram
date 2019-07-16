import { connect } from 'herculex';

Component(connect({})({
  props: {
    card: {},
  },
  methods: {
    onGoToSpecialCard() {
      const { card } = this.props;
      this.dispatch('goToSpecialCard', { card });
    },
  },
}));
