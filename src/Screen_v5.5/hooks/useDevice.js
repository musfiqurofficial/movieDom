import React from 'react';
import { useDispatch } from 'react-redux';
import { update_device } from '../redux/slices/device_slice';


export const _SMALL_WIDTH_LIMIT = 780;

function useDevice() {
    const dispatch = useDispatch();


    React.useEffect(() => {
        const _is_touchable = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0);

        dispatch(update_device({ device_width: window.innerWidth }));
        dispatch(update_device({ is_touch_device: _is_touchable }));

        if (_is_touchable || window.innerWidth < _SMALL_WIDTH_LIMIT) {
            dispatch(update_device({ is_small_device: true }));
        } else {
            dispatch(update_device({ is_small_device: false }));
        }

        window.onresize = function (e) {
            const _is_touchable = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0);
            const _inner_width = e.currentTarget.innerWidth;

            dispatch(update_device({ device_width: _inner_width }));
            dispatch(update_device({ is_touch_device: _is_touchable }));

            (_is_touchable || _inner_width < _SMALL_WIDTH_LIMIT) ?
                dispatch(update_device({ is_small_device: true })) :
                dispatch(update_device({ is_small_device: false }));
        }

    }, [])
}

export default useDevice;