import { useState, useEffect, useReducer, Dispatch, SetStateAction } from 'react';
import axios from 'axios';

type State = {
    data?: any;
    isLoading: boolean;
    isError: boolean;
   }

type Action =
 | { type: 'FETCH_INIT' }
 | { type: 'FETCH_SUCCESS', payload: string }
 | { type: 'FETCH_FAILURE' };

const dataFetchReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return { ...state, isLoading: true, isError: false };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      throw new Error();
  }
};

const useDataApi = <T>(initialUrl: string, initialData?: T):[{
    data?: T;
    isLoading: boolean;
    isError: boolean;
}, Dispatch<SetStateAction<string>>] => {
  const [url, setUrl] = useState(initialUrl);

  const [state, dispatch] = useReducer(dataFetchReducer, {
    data: initialData,
    isLoading: false,
    isError: false,
  });

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' });

      try {
        const result = await axios(url);

        if (!didCancel) {
          dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: 'FETCH_FAILURE' });
        }
      }
    };

    fetchData();

    return () => {
      didCancel = true;
    };
  }, [url]);

  return [state, setUrl];
};

export default useDataApi;