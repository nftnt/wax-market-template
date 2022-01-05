import React, {useContext, useEffect, useState} from 'react';
import cn from "classnames";
import {Context} from "../marketwrapper";
import {getCollection} from "../api/Api";
import LoadingIndicator from "../loadingindicator/LoadingIndicator";
import CollectionTitle from "../assetpreview/CollectionTitle";
import Link from "../common/util/input/Link";

import moment from 'moment';
import BlendPreviewImage from "./BlendPreviewImage";

function BlendItem(props) {
    const [ state, dispatch ] = useContext(Context);
    const [ isLoading, setIsLoading ] = useState(true);
    const [collection, setCollection] = useState(null);

    const blend = props['blend'];

    const {display_data, blend_id, collection_name, start_time, end_time} = blend;

    const displaydata = JSON.parse(display_data);

    const {name, image, description} = displaydata;

    const currentTime = moment();

    const parseCollection = (res) => {
        if (res && res['success'])
            setCollection(res['data']);

        setIsLoading(false);
    };

    useEffect(() => {
        getCollection(collection_name).then(parseCollection);
    }, [collection_name]);

    return (
        <div className={cn('w-full')}>
            {isLoading ? <LoadingIndicator /> : <div className={cn(
                'relative w-full mx-auto rounded-md overflow-hidden',
                'flex flex-col',
                'text-base break-words',
                'backdrop-filter backdrop-blur-sm border border-paper',
                'shadow-md bg-paper'
            )}>
                <CollectionTitle collection={collection} />
                <Link href={`/blend/${blend_id}`}>
                    <div className={cn('w-full')}>
                        <BlendPreviewImage {...props} asset={{'data': {'img': image}}} />
                    </div>
                    <div className={cn(
                        'w-full flex justify-center items-center p-2 h-16',
                        'text-center text-base font-light text-neutral',
                    )}>
                        {name}
                    </div>
                    <div className={cn(
                        'w-full flex justify-center items-center',
                        'text-center text-base font-light text-neutral',
                    )}>
                        {(currentTime < start_time && currentTime > end_time) || end_time === 0 ? 'Active': 'Inactive'}
                    </div>
                </Link>
            </div> }
        </div>
    );
}

export default BlendItem;