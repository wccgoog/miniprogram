import mockCityTabs from './city-service.mock';
import { Http } from './base';
import { config } from '../config';

export default async function getCityTabs() {
  const data = {
    sysCode: config.sysCode,
  };
  const res = await Http.post('/proxy-app/serviceCenter/app/findPageInstanceAreaListTree', data);
  const cityTabs = transformCityTabs([res]);
  my.setStorageSync({
    key: 'cityTabs',
    data: cityTabs,
  });
  return cityTabs;
}

function transformCityTabs(citys) {
  const city = [];
  if (citys && citys.length > 0) {
    citys.map(item => {
      city.push({
        code: item.code,
        name: item.name,
        tabsName: `${item.name}本级`,
      });
      if (Array.isArray(item.subArea)) {
        item.subArea.map(k => {
          // 区级目录，首页显示需要添加市级名称， 如： 无锡市新吴区
          const name = k.type === '3' ? (item.name + k.name) : k.name;
          if (Array.isArray(k.subArea)) {
            city.push({
              code: k.code,
              name,
              tabsName: k.name,
              childList: transformCityTabs([k]),
            });
          } else {
            city.push({
              code: k.code,
              name,
              tabsName: k.name,
            });
          }
        });
      } else {
        city.push({
          code: item.code,
          name: item.name,
          tabsName: item.name,
        });
      }
    });
  }

  return city;
}
