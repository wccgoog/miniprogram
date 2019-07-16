import { connect } from 'herculex';

Component(connect({
  mapStateToProps: ['recommendServices'],
})({
  methods: {
    onGoMarket() {
      this.dispatch('goToMarket');
    },
  },
}));
