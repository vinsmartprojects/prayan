import _ from "lodash";
import { ClientSearchParams } from "src/@types/client";

export function buildClientWhereFilter(param: any, searchQ: any, status: any) {


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