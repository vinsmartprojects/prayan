import _ from "lodash";
import { LocationSearchParams } from "src/@types/location";

export function buildLocationWhereFilter(param: any, searchQ: any, status: any) {


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


    if (param === "NAME") {
        searchQuery = {

            name: {
                startsWith: searchQ,
                mode: 'insensitive',

            }
        }

    }
    if (param === "CODE") {
        searchQuery = {

            code: {
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