import _ from "lodash";
import { VehicleSearchParams } from "src/@types/vehicle";

export function buildVehicleWhereFilter(param: any, searchQ: any, status: any) {


    var _statusQuery: any = undefined;
    var searchQuery = {};

    if (status == "ACTIVE") {

        _statusQuery = {
            isActive: true
        }
    }
    if (status == "VERFIIED") {

        _statusQuery = {
            isVerified: true
        }
    }

    if (status == "SUSPENDED") {

        _statusQuery = {
            isBanneed: true
        }
    }


    if (param === "REGISTRATIONNO") {
        searchQuery = {

            registerNo: {
                startsWith: searchQ,
                mode: 'insensitive',

            }
        }

    }
   
    

   

    if (_statusQuery) {
        return {
            where: {
                AND: [
                    searchQuery,
                    _statusQuery
                ]

            }
        }

    }
    if (!_statusQuery) {
        return {
            where: {

                ...searchQuery,


            }
        }

    }
    return {}


}