import React from 'react';
import { useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

function SafeAreaWrapper(Component: any) {
    const Render = useCallback((props: any) => {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <Component {...props} />
            </SafeAreaView>
        )
    }, [Component])

    return Render;
}
export default SafeAreaWrapper;
