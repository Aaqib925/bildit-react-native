import { Keyboard, TouchableWithoutFeedback } from 'react-native'
import React from 'react'

const KeyboardDismissView = ({ children }: { children: React.ReactNode }) => {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            {children}
        </TouchableWithoutFeedback>
    )
}

export default KeyboardDismissView
