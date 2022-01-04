import React from 'react';
import * as pkg from 'eosjs'

import fetch from 'node-fetch';



const { Api, JsonRpc } = pkg;


const rpc = new JsonRpc('http://api.wax.alohaeos.com', {
    fetch
});
const api = new Api({ rpc, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });



function claimAsset(){
rpc.get_table_rows({
    code: "packs.nftnt",
    scope: "packs.nftnt",
    table: "unboxpacks",
    index_position: "secondary",
    key_type: "name",
    show_payer: "false"
}).then(res => {

    let packassetid = res.rows[0]
    if (packassetid === undefined) {
      
        return "No Unclaimed Packs!";
    }

    else {
        let toclaim = packassetid.pack_asset_id
        




        api.transact({
            actions: [{
                account: 'packs.nftnt',
                name: 'claimunboxed',
                authorization: [{
                    actor: user,
                    permission: 'active',
                }],
                data: {
                    pack_asset_id: toclaim
                }
            }],
        }, {
            blocksBehind: 3,
            expireSeconds: 1200,
        })
        .catch(err => {
            
                console.log("no openers")
                
        })
        .then(res => {
            console.dir(res);
        
        })

        }


    })

}

const PacksPage = (props) => {
//     return (<Packs {...props} />);
// };

// PacksPage.getInitialProps = async (ctx) => {
//     const paths = ctx.asPath.split('/');

//     const values = qs.parse(paths[1].replace( '?', ''));

//     return values;
return (
    <div>
    <h3>COMING SOON
    </h3>
    <p>To open TheBethAlice Initium Packs <a href='https://wax.atomichub.io/trading/transfer?memo=unbox&partner=packs.nftnt'>Click Here</a> and select your pack for transfer</p>
    <div>If you dont recieve your asssets, click to claim.</div>
    <button onClick={claimAsset()}>
        CLAIM
         </button>
    </div>
)
};

export default PacksPage
