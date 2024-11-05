// src/store/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Helper function to load cart state from localStorage
const loadCartFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('cart');
    const parsedState = serializedState ? JSON.parse(serializedState) : null;

    // Ensure parsedState has a valid structure
    if (parsedState && Array.isArray(parsedState.items) && typeof parsedState.totalQuantity === 'number') {
      return parsedState;
    } else {
      return { items: [], totalQuantity: 0 };
    }
  } catch (error) {
    console.error("Could not load cart from localStorage", error);
    return { items: [], totalQuantity: 0 };
  }
};

// Helper function to save cart state to localStorage
const saveCartToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('cart', serializedState);
  } catch (error) {
    console.error("Could not save cart to localStorage", error);
  }
};

// Initialize the state by loading from localStorage
const initialState = loadCartFromLocalStorage();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.totalQuantity += 1;
      saveCartToLocalStorage(state);  // Save to localStorage after each update
    },
    removeFromCart: (state, action) => {
      const itemIndex = state.items.findIndex(item => item.id === action.payload.id);
      if (itemIndex !== -1) {
        const item = state.items[itemIndex];
        state.totalQuantity -= item.quantity;
        state.items.splice(itemIndex, 1);
      }
      saveCartToLocalStorage(state);  // Save to localStorage after each update
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        const quantityDifference = quantity - item.quantity;
        item.quantity = quantity;
        state.totalQuantity += quantityDifference;
      }
      saveCartToLocalStorage(state);  // Save to localStorage after each update
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      saveCartToLocalStorage(state);  // Save to localStorage after each update
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
