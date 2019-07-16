import { connect } from 'herculex';

Component(connect({})({
  data: {
    items: ['1', '2', '3'],
    indicatorDots: true,
    autoplay: false,
    interval: 3000,
  },
  methods: {
    onGoToMyCard() {
      this.dispatch('goToMyCard');
    },
  },
}));
