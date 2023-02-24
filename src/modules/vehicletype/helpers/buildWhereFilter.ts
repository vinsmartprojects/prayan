import _ from "lodash";
import { VehicletypeSearchParams } from "src/@types/vehicletype";

export function buildVehicletypeWhereFilter(param: any, searchQ: any, status: any) {


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


    if (param === "TITLE") {
        searchQuery = {

            title: {
                startsWith: searchQ,
                mode: 'insensitive',

            }
        }

    }
    if (param === "MOBILE") {
        searchQuery = {

            contactMobile: {
                startsWith: searchQ,
                mode: 'insensitive',

            }
        }

    }
    if (param === "EMAIL") {
        searchQuery = {

            contactEmail: {
                startsWith: searchQ,
                mode: 'insensitive',

            }

        }
    }

    if (param === "PINCODE") {
        searchQuery = {
            address: {

                pincode: {
                    startsWith: searchQ,
                    mode: 'insensitive',

                }
            }
        }

    }

    if (param === "AREA") {
        searchQuery = {
            address: {
                area: {
                    startsWith: searchQ,
                    mode: 'insensitive',

                }
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