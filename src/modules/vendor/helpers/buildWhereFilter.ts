import _ from "lodash";
import { VendorSearchParams } from "src/@types/vendor";

export function buildVendorWhereFilter(param: any, searchQ: any) {

    if (param === "TITLE") {
        return {
            where: {

                title: {
                    startsWith: searchQ,
                    mode: 'insensitive',

                }
            }
        }
    }
    if (param === "MOBILE") {
        return {
            where: {

                contactMobile: {
                    startsWith: searchQ,
                    mode: 'insensitive',

                }
            }
        }
    }
    if (param === "EMAIL") {
        return {
            where: {

                contactEmail: {
                    startsWith: searchQ,
                    mode: 'insensitive',

                }
            }
        }
    }

    if (param === "PINCODE") {
        return {
            where: {
                address: {

                    pincode: {
                        startsWith: searchQ,
                        mode: 'insensitive',

                    }
                }
            }
        }
    }

    if (param === "AREA") {
        return {
            where: {
                address: {
                    area: {
                        startsWith: searchQ,
                        mode: 'insensitive',

                    }
                }
            }
        }
    }
    return {}


}