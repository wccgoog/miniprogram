import { connect } from 'herculex';

Component(connect({
  mapStateToProps: ['sitesInfo'],
})({
  data: {
    scale: 13,
  },
  methods: {
    onMarkerTap(e) {
      this.dispatch('onSiteChange', e);
    },
  },
}));
