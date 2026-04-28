import React from 'react'
import { useParams } from 'react-router-dom'
import Data from '../Data';
// console.log(Data);
const Deatils = () => {

    const { id } = useParams();

    const post = Data.find((item)=>item.id===parseInt(id))
    return (
        <>
            <div>Deatils Page</div>
            <div>
                {/* <h1>{post.title}</h1> */}
                <img src={post.img_url}/>
                <p>{post.description}</p>
            </div>
        </>
    )
}

export default Deatils