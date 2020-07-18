import RestClient from '../RestClient/RestClient';

export function getData(params) {
  let url = 'search';
  if (params && params.tags) {
    url = `url?tags=${params.tags}`;
  }
  if (params && params.page) {
    url = `url&&page=${params.page}`;
  }
  const config = {
    url: 'search',
  };
  return RestClient.get(config).then((json) => {
    return json;
  });
}
