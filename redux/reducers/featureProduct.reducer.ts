
import actionTypes from "../constants/actionTypes";
import { IProduct, IProductResponse } from "../types/FeatureProduct";

export interface IFeatureProductState {
  products: IProduct[];
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
  };
}

const initialState: IFeatureProductState = {
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
  },
};

const featureProductReducer = (
  state = initialState,
  action: any
): IFeatureProductState => {
  switch (action.type) {
    case actionTypes.GET_FEATURE_PRODUCT_REQUEST:
      const requestedPage = action.payload.page || 1;
      console.log(`📝 REQUEST: Page ${requestedPage}, limit: ${action.payload.limit}`);
      
      // যদি page 1 হয়, তাহলে products clear করব
      // যদি page > 1 হয়, তাহলে আগের products রাখব এবং loading true করব
      return {
        ...state,
        loading: true,
        error: null,
        currentPage: requestedPage,
        filters: {
          ...state.filters,
          ...action.payload,
        },
        // যদি প্রথম পেজ হয়, তাহলে products clear করুন
        products: requestedPage === 1 ? [] : state.products,
      };

    case actionTypes.GET_FEATURE_PRODUCT_SUCCESS:
      const response = action.payload as IProductResponse;
      const totalPages = response.totalPage || 0;
      const currentPage = state.currentPage;
      const newProducts = response.data || [];
      
      console.log(`✅ SUCCESS: Page ${currentPage}, Total pages: ${totalPages}, Products received: ${newProducts.length}`);
      
      // নতুন products আগের products এর সাথে append করুন
      const updatedProducts = currentPage === 1 
        ? newProducts 
        : [...state.products, ...newProducts]; // পরের পেজ হলে append করুন
      
      return {
        ...state,
        loading: false,
        error: null,
        products: updatedProducts,
        totalPages: totalPages,
        totalProducts: updatedProducts.length,
        hasMore: currentPage < totalPages,
      };

    case actionTypes.GET_FEATURE_PRODUCT_FAILURE:
      console.log(`❌ FAILURE: ${action.payload?.message || 'Unknown error'}`);
      return {
        ...state,
        loading: false,
        error: action.payload?.message || 'Failed to fetch products',
        // শুধু error হলে products clear করবেন না
      };

    default:
      return state;
  }
};

export default featureProductReducer;