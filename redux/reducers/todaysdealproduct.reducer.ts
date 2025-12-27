import actionTypes from "../constants/actionTypes";
import { ITodaysDealProduct, ITodaysDealProductApiResponse } from "../types/TodaysDealProduct";

export interface ITodaysDealProductState {
  products: ITodaysDealProduct[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  totalProducts: number;
  hasMore: boolean;
  filters: {
    page: number;
    limit: number;
    search: string;
    categoryId?: number;
    subCategoryId?: number;
    subSubCategoryId?: number;
    brandId?: number;
    minPrice?: number;
    maxPrice?: number;
  };
}

const initialState: ITodaysDealProductState = {
  products: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 0,
  totalProducts: 0,
  hasMore: false,
  filters: {
    page: 1,
    limit: 10,
    search: '',
    categoryId: undefined,
    subCategoryId: undefined,
    subSubCategoryId: undefined,
    brandId: undefined,
    minPrice: undefined,
    maxPrice: undefined,
  },
};

const todaysDealReducer = (
  state = initialState,
  action: any
): ITodaysDealProductState => {
  switch (action.type) {
    case actionTypes.GET_TODAYS_DEAL_PRODUCT_REQUEST:
      const requestedPage = action.payload.page || 1;
      console.log(`🔥 TODAY'S DEAL REQUEST: Page ${requestedPage}`);
      
      return {
        ...state,
        loading: true,
        error: null,
        currentPage: requestedPage,
        filters: {
          ...state.filters,
          ...action.payload,
        },
        products: requestedPage === 1 ? [] : state.products,
      };

    case actionTypes.GET_TODAYS_DEAL_PRODUCT_SUCCESS:
      const response = action.payload as ITodaysDealProductApiResponse;
      const totalPages = response.totalPage || 0;
      const currentPage = state.currentPage;
      const newProducts = response.data || [];
      
      console.log(`✅ TODAY'S DEAL SUCCESS: 
        Page: ${currentPage}, 
        Total pages: ${totalPages}, 
        New products: ${newProducts.length}
      `);
      
      // ডুপ্লিকেট চেক
      const existingIds = new Set(state.products.map(p => p.id));
      const uniqueNewProducts = newProducts.filter(product => !existingIds.has(product.id));
      
      // প্রডাক্ট মার্জ
      let updatedProducts: ITodaysDealProduct[];
      if (currentPage === 1) {
        updatedProducts = uniqueNewProducts;
      } else {
        updatedProducts = [...state.products, ...uniqueNewProducts];
      }
      
      // hasMore ক্যালকুলেশন
      const hasMore = currentPage < totalPages;
      
      return {
        ...state,
        loading: false,
        error: null,
        products: updatedProducts,
        totalPages: totalPages,
        totalProducts: response.total || updatedProducts.length,
        hasMore: hasMore,
      };

    case actionTypes.GET_TODAYS_DEAL_PRODUCT_FAILURE:
      console.log(`❌ TODAY'S DEAL FAILURE`);
      return {
        ...state,
        loading: false,
        error: action.payload?.message || 'Failed to fetch today\'s deal products',
      };

    case actionTypes.CLEAR_TODAYS_DEAL_PRODUCTS:
      return initialState;

    case actionTypes.UPDATE_TODAYS_DEAL_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload,
          page: 1,
        },
        currentPage: 1,
        products: [],
      };

    default:
      return state;
  }
};

export default todaysDealReducer;