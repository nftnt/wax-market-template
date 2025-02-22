import React, {useContext, useEffect, useState} from 'react';
import cn from "classnames";
import PopupButton from './PopupButton';
import PopupContent from './PopupContent';
import parsePacks from './ClaimPopup'
import ErrorMessage from "./ErrorMessage";
import LoadingIndicator from "../loadingindicator/LoadingIndicator";
import config from "../../config.json";
import {Context} from "../marketwrapper";
import ResultWindow from "./ResultWindow";
import {claimPack} from "../helpers/Helpers";
import Packs from '../packs';


function UnboxPopup(props) {
    const asset = props['asset'];

    const {collection, schema, name, data} = asset;

    const image = data['img'] ? data['img'].includes('http') ? data['img'] : config.ipfs + data['img'] : '';

    const video = data['video'] ? data['video'].includes(
        'http') ? data['video'] : config.ipfs + data['video'] : '';

    const ual = props['ual'] ? props['ual'] : {'activeUser': null};
    const activeUser = ual['activeUser'];

    const callBack = props['callBack'];

    const userName = activeUser ? activeUser['accountName'] : null;
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();
    const closeCallBack = props['closeCallBack'];
    const [animation, setAnimation] = useState(null);
    const [showAnimation, setShowAnimation] = useState(true);
    const [showResults, setShowResults] = useState(false);
    const [pack, setPack] = useState(null);
    const [results, setResults] = useState(null);
    const [templates, setTemplates] = useState(null);

    const [ state, dispatch ] = useContext(Context);

  
    const loadResults = (templateIds) => {
        if (templateIds && templateIds.length > 0) {
            const results = [];
            for (let i = 0; i < templateIds.length; i++) {
                templates.map(template => {
                    if (template.template_id.toString() === templateIds[i].toString()) {
                        results.push(template);
                    }
                })
            }

            setResults(results);

            if (pack.displayData && pack.displayData.animation && pack.displayData.animation.drawing) {
                const data = pack.displayData.animation.drawing.data;
                const video = data ? data.video : null;
                const bgColor = pack.displayData.animation.drawing.bg_color;

                if (video) {
                    setAnimation({video: video, bgColor: bgColor});
                }
            }
        } else {
            throw 'Could not load Pack';
        }
        setIsLoading(false);
    }

    const getPackResult = () => {
        try {
            claimPack(pack, asset, activeUser).then(res => loadResults(res));
        } catch (e) {
            callBack({unboxed: false, error: e});
            console.log(e);
            setError(e.message);
        }
    };
  


    const unbox = async () => {
        setIsLoading(true);

       
           
            await activeUser.signTransaction({
                actions: [{
                    account: 'atomicassets',
                    name: 'transfer',
                    authorization: [{
                        actor: userName,
                        permission: activeUser['requestPermission'],
                    }],
                    data: {
                        from: userName,
                        memo: 'unbox',
                        to: 'packs.nftnt',
                        asset_ids: [asset.asset_id]
                    },
                }]
            }, {
                expireSeconds: 300, blocksBehind: 0,
            });
            setTimeout(3000);
    
        
    };

    const cancel = () => {
        callBack({unboxed: false});
        closeCallBack();
    };

    const acknowledge = () => {
        callBack({unboxed: true});
        closeCallBack();
    };

    const stopAnimation = () => {
        setShowAnimation(false);
        setShowResults(true);
    };

    return (
         <div className={cn(
            'fixed top-40 left-popup',
            'w-full max-w-popup lg:max-w-popup-lg h-auto',
            'p-3 lg:p-8 m-0',
            'text-sm text-neutral font-light opacity-100',
            'bg-paper rounded-xl shadow-lg z-100',
            'backdrop-filter backdrop-blur-lg',
        )}>
            <img className="absolute z-50 cursor-pointer top-4 right-4 w-4 h-4 " onClick={cancel} src="/close_btn.svg" alt="X" />
            <div className="text-3xl mt-4 lg:mt-0 text-center">{name}</div>
            <PopupContent image={image} video={video} collection={collection['name']} schema={schema['schema_name']} />
            <div className="text-lg text-left my-4">
                {`Are you sure you want to unbox ${name}?`}
            </div>
            <div>
           
                <PopupButton text="Cancel" onClick={cancel} className="text-neutral bg-paper border-neutral" />
                <PopupButton text="Unbox" onClick={unbox} id={'unbox-button'} />
            </div> 
        </div>
    );
        }

export default UnboxPopup;
