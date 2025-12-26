
import actionTypes from "../constants/actionTypes";
import { IMostVisitedProduct, IMostVisitedProductApiResponse } from "../types/MostVisitedProduct";

export interface IMostVisitedProductState {
  products: IMostVisitedProduct[];
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
    visitorId?: string;
    sort?: string;
  };
}

const initialState: IMostVisitedProductState = {
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
    visitorId: undefined,
    sort: undefined,
  },
};

const mostVisitedReducer = (
  state = initialState,
  action: any
): IMostVisitedProductState => {
  switch (action.type) {
    case actionTypes.GET_MOST_VISITED_PRODUCT_REQUEST:
      const requestedPage = action.payload.page || 1;
      console.log(`📝 MOST VISITED REQUEST: Page ${requestedPage}, Visitor: ${action.payload.visitorId || 'N/A'}`);
      
      return {
        ...state,
        loading: true,
        error: null,
        currentPage: requestedPage,
        filters: {
          ...state.filters,
          ...action.payload,
        },
        // শুধু প্রথম পেজের জন্য products clear করুন
        products: requestedPage === 1 ? [] : state.products,
      };

    case actionTypes.GET_MOST_VISITED_PRODUCT_SUCCESS:
      const response = action.payload as IMostVisitedProductApiResponse;
      const totalPages = response.totalPage || 0;
      const currentPage = state.currentPage;
      const newProducts = response.data || [];
      
      console.log(`✅ MOST VISITED SUCCESS: 
        Page: ${currentPage}, 
        Total pages: ${totalPages}, 
        New products: ${newProducts.length},
        Previous products: ${state.products.length}
      `);
      
      // ডুপ্লিকেট প্রডাক্ট রিমুভ করা
      const existingIds = new Set(state.products.map(p => p.id));
      const uniqueNewProducts = newProducts.filter(product => !existingIds.has(product.id));
      
      console.log(`📊 After duplicate removal: ${uniqueNewProducts.length} unique new products`);
      
      // নতুন products আগের products এর সাথে append করুন
      let updatedProducts: IMostVisitedProduct[];
      if (currentPage === 1) {
        updatedProducts = newProducts;
      } else {
        updatedProducts = [...state.products, ...uniqueNewProducts];
      }
      
      // totalProducts ক্যালকুলেশন
      const apiTotalProducts = (response as any).total || 
                               (response as any).totalProducts || 
                               (response as any).totalItems ||
                               0;
      
      let totalProducts = apiTotalProducts;
      if (!apiTotalProducts && totalPages > 0) {
        totalProducts = totalPages * state.filters.limit;
      }
      
      // hasMore ক্যালকুলেশন
      const hasMore = currentPage < totalPages;
      
      console.log(`📊 FINAL: 
        Current products: ${updatedProducts.length},
        Total products: ${totalProducts},
        Has more: ${hasMore},
        Current page: ${currentPage},
        Total pages: ${totalPages}
      `);
      
      return {
        ...state,
        loading: false,
        error: null,
        products: updatedProducts,
        totalPages: totalPages,
        totalProducts: totalProducts,
        hasMore: hasMore,
      };

    case actionTypes.GET_MOST_VISITED_PRODUCT_FAILURE:
      console.log(`❌ MOST VISITED FAILURE: ${action.payload?.message || action.payload || 'Unknown error'}`);
      return {
        ...state,
        loading: false,
        error: action.payload?.message || action.payload || 'Failed to fetch most visited products',
      };

    case actionTypes.CLEAR_MOST_VISITED_PRODUCTS:
      console.log('🧹 CLEARING MOST VISITED PRODUCTS');
      return {
        ...initialState,
        filters: {
          ...initialState.filters,
          visitorId: state.filters.visitorId,
        }
      };

    case actionTypes.UPDATE_MOST_VISITED_FILTERS:
      console.log('⚙️ UPDATING MOST VISITED FILTERS');
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

export default mostVisitedReducer;