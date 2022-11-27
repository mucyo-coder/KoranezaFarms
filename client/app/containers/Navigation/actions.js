/*
 *
 * Navigation actions
 *
 */

import axios from "axios";
import handleError from "../../utils/error";
import {
	TOGGLE_CART,
	TOGGLE_CATEGORY,
	SEARCH_CHANGE,
	SUGGESTIONS_FETCH_REQUEST,
	SUGGESTIONS_CLEAR_REQUEST,
} from "./constants";

export const toggleCart = () => {
	return {
		type: TOGGLE_CART,
	};
};

export const toggleCategory = () => {
	return {
		type: TOGGLE_CATEGORY,
	};
};

export const onSearch = (v) => {
	return {
		type: SEARCH_CHANGE,
		payload: v,
	};
};

export const onSuggestionsFetchRequested = (value) => {
	const inputValue = value.value.trim().toLowerCase();

	return async (dispatch, getState) => {
		try {
			if (inputValue && inputValue.length % 3 === 0) {
				const response = await axios.get(
					`/api/product/list/search/${inputValue}`,
				);
				dispatch({
					type: SUGGESTIONS_FETCH_REQUEST,
					payload: response.data.products,
				});
			}
		} catch (error) {
			handleError(error, dispatch);
		}
	};
};

export const onSuggestionsClearRequested = () => {
	return {
		type: SUGGESTIONS_CLEAR_REQUEST,
		payload: [],
	};
};
