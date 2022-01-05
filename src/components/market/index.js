import React, {useContext, useEffect, useState} from 'react';

import {Context} from "../marketwrapper";

import config from "../../config.json";

import AssetPreview from "../assetpreview/AssetPreview";
import {getListings} from "../api/Api";
import LoadingIndicator from "../loadingindicator/LoadingIndicator";
import Pagination from "../pagination/Pagination";
import Filters from "../filters/Filters";
import Content from "../common/layout/Content"
import Page from "../common/layout/Page"
import Header from "../common/util/Header"
import {getValues, getFilters} from "../helpers/Helpers";
import ScrollUpIcon from '../common/util/ScrollUpIcon';
import cn from "classnames"

const Market = (props) => {
    const [ state, dispatch ] = useContext(Context);

    const [listings, setListings] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const values = getValues();

    const initialized = state.collections !== null && state.collections !== undefined;

    const [showScrollUpIcon, setShowScrollUpIcon] = useState(false);

    const getResult = (result) => {
        setListings(result);
        setIsLoading(false);
    }

    const initListings = async (page) => {
        setIsLoading(true);
        getListings(getFilters(values, state.collections, 'market', page)).then(result => getResult(result));
    };

    useEffect(() => {
        if (initialized)
            initListings(page)
    }, [page, initialized]);

    const handleScroll = e => {
        let element = e.target;

        if (element.id === 'MarketPage') {
            setShowScrollUpIcon(element.scrollTop > element.clientHeight);
            if (element.scrollHeight - element.scrollTop === element.clientHeight) {
                dispatch({ type: 'SET_SCROLLED_DOWN', payload: true });
            }
        }
    };

    const scrollUp = () => {
        if (process.browser) {
            const element = document.getElementById("MarketPage");
            element.scrollTo({left: 0, top: 0, behavior: "smooth"});
        }
    };

    return (
        <Page onScroll={e => handleScroll(e)} id="MarketPage">
            <Header
                title={config.market_title}
                description={config.market_description}
                image={config.market_image}
            />
            <Content headline="Market">
                <div className={cn('w-full grid grid-cols-8 gap-10')}>
                    <div 
                        className={cn(
                            'col-span-8 sm:col-span-2'
                        )}    
                    >
                            
                        <Filters
                            {...props}
                            searchPage={'market'}
                        />
                    </div>
                    <div
                        className={cn(
                            'col-span-8 sm:col-span-6',
                        )}
                    >
                        <Pagination
                            items={listings && listings.data}
                            page={page}
                            setPage={setPage}
                        />
                        { isLoading ? <LoadingIndicator /> : 
                            <div className={cn(
                                "relative w-full mb-24",
                                "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                            )}>
                                {listings && listings['success'] ? listings['data'].map((listing, index) =>
                                    <AssetPreview
                                        {...props}
                                        key={index}
                                        index={index}
                                        listing={listing}
                                        assets={listing.assets}
                                    />
                                    ) : ''
                                }
                            </div>
                        }
                        {isLoading ? '' :
                            <Pagination
                                items={listings && listings.data}
                                page={page}
                                setPage={setPage}
                            />
                        }
                    </div>
                </div>
            </Content>
            {showScrollUpIcon ? <ScrollUpIcon onClick={scrollUp} /> : '' }
        </Page>
    );
};

export default Market;
