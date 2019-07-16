import { connect } from 'herculex';
import services from '../../services/services-info.mock';
Component(connect({
  mapStateToProps: {
    specialServices: (state) => {
      return [services.gjjService, services.shebaoService, services.jtcxService];
    },
  },
})({
  methods: {

  },
}));
