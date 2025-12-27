import actionTypes from "../constants/actionTypes";
import { INewArrivalProduct, INewArrivalProductApiResponse } from "../types/NewArrivalProduct";

export interface INewArrivalProductState {
  products: INewArrivalProduct[];
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
    sort?: string;
  };
}

const initialState: INewArrivalProductState = {
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
    sort: 'newest',
  },
};

const newArrivalReducer = (
  state = initialState,
  action: any
): INewArrivalProductState => {
  switch (action.type) {
    case actionTypes.GET_NEW_ARRIVAL_PRODUCT_REQUEST:
      const requestedPage = action.payload.page || 1;
      console.log(`🆕 NEW ARRIVAL REQUEST: Page ${requestedPage}`);
      
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

    case actionTypes.GET_NEW_ARRIVAL_PRODUCT_SUCCESS:
      const response = action.payload as INewArrivalProductApiResponse;
      const totalPages = response.totalPage || 0;
      const currentPage = state.currentPage;
      const newProducts = response.data || [];
      
      console.log(`✅ NEW ARRIVAL SUCCESS: 
        Page: ${currentPage}, 
        Total pages: ${totalPages}, 
        New products: ${newProducts.length}
      `);
      
      // ডুপ্লিকেট চেক
      const existingIds = new Set(state.products.map(p => p.id));
      const uniqueNewProducts = newProducts.filter(product => !existingIds.has(product.id));
      
      // প্রডাক্ট মার্জ
      let updatedProducts: INewArrivalProduct[];
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

    case actionTypes.GET_NEW_ARRIVAL_PRODUCT_FAILURE:
      console.log(`❌ NEW ARRIVAL FAILURE`);
      return {
        ...state,
        loading: false,
        error: action.payload?.message || 'Failed to fetch new arrival products',
      };

    case actionTypes.CLEAR_NEW_ARRIVAL_PRODUCTS:
      return initialState;

    case actionTypes.UPDATE_NEW_ARRIVAL_FILTERS:
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

export default newArrivalReducer;