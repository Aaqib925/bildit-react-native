import { create } from 'zustand';
import { createZustandStore } from '../../utils/resetStore';


export interface OverlayModalState {
    isModalVisible: boolean;
    setModalVisible: (isLoggedIn: boolean) => void;
}

const initialState: OverlayModalState = {
    isModalVisible: false,
    setModalVisible: () => { },
};

const useOverlayModalStore = createZustandStore<OverlayModalState>()(
    (set) => ({
        ...initialState,
        isModalVisible: false,

        setModalVisible: (isModalVisible): void => {
            set({ isModalVisible });
        },

    })
);


export default useOverlayModalStore;
