import _ from 'lodash';

export function buildVehicletypeWhereFilter(param: any, searchQ: any, status: any) {
  var searchQuery = {};

  if (param === 'NAME') {
    searchQuery = {
      name: {
        startsWith: searchQ,
        mode: 'insensitive',
      },
    };
  }

  if (searchQuery) {
    return {
      where: {
        ...searchQuery,
      },
    };
  }

  return {};
}
