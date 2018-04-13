import _ from 'lodash';
import {FETCH_POSTS, FETCH_POST, DELETE_POST, UPDATE_POST} from '../actions/posts';

export default function (state = {}, action) {
    switch (action.type) {

        case FETCH_POST:
            return {...state, [action.payload.data.id]: action.payload.data};

        case DELETE_POST:
            //remove id from local state
            return _.omit(state, action.payload);

        case FETCH_POSTS:
            return _.mapKeys(action.payload.data, 'id');

        case UPDATE_POST:
            if (action.payload)
                return {...state, [action.payload.data.id]: action.payload.data};


        default:
            return state;
    }
}