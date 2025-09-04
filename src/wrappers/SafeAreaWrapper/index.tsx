import React, { useCallback } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { heightResponsive } from "../../utils/responsive";

function WithAppSafeAreaView(Component: any) {
    const insets = useSafeAreaInsets();
    const Render = useCallback((props: any) => {
        return (
            <View style={{ flex: 1 , bottom: insets.bottom, top: insets.top, left: insets.left, right: insets.right, paddingBottom: heightResponsive(insets.bottom), marginBottom: heightResponsive(insets.bottom) }}>
                <Component {...props} />
            </View>
        )
    }, [insets.bottom, insets.left, insets.right, insets.top, Component])

    return Render;
}
export default WithAppSafeAreaView;
