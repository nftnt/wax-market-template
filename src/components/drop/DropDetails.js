import React from "react";
import config from '../../config.json';
import Link from '../common/util/input/Link';

const DropDetails = (props) => {
    const template = props.template;
    const collection = props.collection;

    const {name, immutable_data} = template;

    return (
        <div>
        <div className="text-sm text-white ">
            <h4 className="inline-flex text-primary mb-4">
                { collection['img'] ? <div className="h-6 mr-3 rounded-lg ">
                    <img src={config.ipfs + collection['img']} className="collection-img" alt="none" />
                </div> : '' }
                <Link href={`/collection/${collection.collection_name}`}>
                    <div className='NextLink'>{collection.collection_name}</div>
                </Link>
            </h4>
            </div><div>

            <h2 className="text-left text-white text-3xl font-bold mb-4">
                {name}
            </h2>
           
            </div>
            <div>

            <table className="w-full my-auto text-lg font-normal">
                <tr>
                    <td className="text-left w-1/3">Template ID:</td>
                    <td className="text-right overflow-x-auto leading-5 max-w-td">{template.template_id}</td>
                </tr>
                <tr>
                    <td className="text-left w-1/3">Issued Supply:</td>
                    <td className="text-right overflow-x-auto leading-5 max-w-td">
                        <div className="inline-flex leading-6">
                            {template.issued_supply}
                        </div>
                    </td>
                </tr>
                {Object.keys(immutable_data).map(key => !['image', 'img', 'video', 'backimg', 'img_back'].includes(key) &&
                    <tr>
                       
                      
                    </tr>
                )}
            </table>
        </div>
        </div>
    );
};

export default DropDetails;
