import {create} from 'zustand'


interface BearState {
    bears: number
    users: string[]
    increase: (by: number) => void
    decrease: (by: number) => void
}

const useBearStore = create<BearState>()((set) => ({
    bears: 0,
    users: [],
    increase: (by) => set((state) => ({bears: state.bears + by})),
    decrease: (by) => set((state) => ({bears: state.bears - by})),
}))

export default useBearStore