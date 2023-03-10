import _ from 'lodash';
import { VehicleSearchParams, FilterType } from 'src/@types/vehicle';

export function buildVehicleWhereFilter(
  param: VehicleSearchParams,
  searchQ: any,
  filters?: FilterType
) {
  var _filters: any = undefined;
  var searchQuery = {};

  if (filters?.status) {
    _filters = {
      status: filters?.status,
    };
  }
  if (filters?.make) {
    _filters = {
      make: filters?.make,
    };
  }
  if (filters?.seatingCapacity) {
    _filters = {
      seatingCapacity: filters?.seatingCapacity,
    };
  }
  if (filters?.bodySegment) {
    _filters = {
      bodySegment: filters?.bodySegment,
    };
  }
  if (filters?.vendor) {
    _filters = {
      vendor: {
        id: filters?.vendor,
      },
    };
  }
  if (filters?.transmissionType) {
    _filters = {
      transmissionType: filters?.transmissionType,
    };
  }
  console.log(JSON.stringify(_filters));

  if (param === 'REGISTERNO') {
    searchQuery = {
      registerNo: {
        contains: searchQ,
        mode: 'insensitive',
      },
    };
  }
  if (_filters) {
    return {
      where: {
        AND: [searchQuery, _filters],
      },
    };
  }
  if (!_filters) {
    return {
      where: {
        ...searchQuery,
      },
    };
  }
  return {};
}
