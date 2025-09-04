import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import { Dimensions } from 'react-native';

export const deviceHeight = Dimensions.get('window').height

export const deviceWidth = Dimensions.get('window').width;

const WIDTH = deviceWidth;
const HEIGHT = deviceHeight;

export function fontResponsive(size: number) {
    return wp((size) / ((WIDTH) / 100));
}

export function widthResponsive(size: number) {
    return wp(size / (WIDTH / 100));
}

export function heightResponsive(size: number) {
    return hp(size / (HEIGHT / 100));
}



