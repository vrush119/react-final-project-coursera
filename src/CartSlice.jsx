import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // each item: { name, image, description, cost, quantity }
  },
  reducers: {
    addItem: (state, action) => {
      const plant = action.payload;
      const existingItem = state.items.find(item => item.name === plant.name);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...plant, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      const plantName = action.payload;
      state.items = state.items.filter(item => item.name !== plantName);
    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const item = state.items.find(item => item.name === name);
      if (item && quantity > 0) {
        item.quantity = quantity;
      } else if (item && quantity === 0) {
        state.items = state.items.filter(item => item.name !== name);
      }
    },
  },
});

// ✅ Export actions to use in components
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

// ✅ Export reducer to register in Redux store
export default CartSlice.reducer;
