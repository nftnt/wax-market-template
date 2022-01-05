import React, {useEffect, useState} from 'react';

import {setQueryStringWithoutPageReload, getValues} from "../helpers/Helpers";
import MarketWrapper from "../marketwrapper"
import {Tab, Tabs} from "react-bootstrap";
import TabItem from "../tabitem/TabItem";

import qs from 'qs';
import cn from "classnames";

import MyPacksList from "./MyPacksList";
import UnclaimedPacksList from "./UnclaimedPacksList";
import Page from "../common/layout/Page";
import Content from "../common/layout/Content";

const Packs = (props) => {
    const values = getValues();

    const keys = ['mypacks', 'unclaimed'];
    const ual = props['ual'] ? props['ual'] : {'activeUser': null};

    const activeUser = ual['activeUser'] && ual['activeUser']['accountName'];
    const loggedOut = activeUser === null;

    const [tabKey, setTabKey] = useState(process.browser ? (
        values['tab'] && keys.includes(values['tab']) ? values['tab'] : 'mypacks'
    ) : (props.tab && keys.includes(props.tab) ? props.tab : 'mypacks'));

    const initTabs = async(key, user, loggedOut, initial = false) => {
        if (key !== tabKey || initial) {
            const query = values;

            delete query['order_dir'];
            delete query['search_type'];
            delete query['order_by'];
            query['tab'] = key;
            if (user)
                query['user'] = user;
            else
                delete query['user'];
            delete query['offer_type'];

            if (!initial)
                setQueryStringWithoutPageReload(qs.stringify(query));
            setTabKey(key);
        }
    };

    useEffect(() => {
        initTabs(tabKey, activeUser, loggedOut, true);
    }, [tabKey, activeUser, loggedOut]);

    const login = () => {

    };

    return (
        <Page>
            <Content headline="Packs">
                <div className="container mx-auto">
                    {loggedOut ? <div onClick={login}>
                        Login
                    </div> : <Tabs
                        className={cn(
                            'border-tabs',
                            'flex h-12 my-10 rounded-md',
                            'text-sm lg:text-base text-neutral',
                            'border border-paper'
                        )}
                        defaultActiveKey={tabKey}
                        id="collection-switch"
                        onSelect={(k) => initTabs(k)}
                    >
                       
                        <Tab
                            eventKey="my packs"
                            title={
                                <TabItem user={activeUser} target={'my packs'} tabKey={tabKey} title={'My Packs'} />
                            }
                        >
                            
                        {tabKey === 'my packs' &&
                            <MyPacksList user={activeUser} {...props} />
                        }
                       
                        </Tab>
                       
                        <Tab
                            eventKey="unclaimed"
                            title={
                                <TabItem user={activeUser} target={'unclaimed'} tabKey={tabKey} title={'Unclaimed Packs'} />
                            }
                        >
                        {tabKey === 'unclaimed' &&
                            <UnclaimedPacksList user={activeUser} {...props} />
                        }
                        </Tab>
                    </Tabs>}
                </div>
            </Content>
        </Page>
    );
};

export default Packs;
