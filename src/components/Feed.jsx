import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { client } from '../client';
import { feedQuery, searchQuery } from '../utils/data';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';


const Feed = () => {
  const [loading,setLoading] = useState(false)
  const [pins, setPins] = useState();
  const {categoryId} = useParams()

  useEffect(() => {
    if (categoryId) {
      setLoading(true);
      const query = searchQuery(categoryId);
      client.fetch(query).then((data) => {
        // console.log(data);
        setPins(data);
        // console.log("1");
        setLoading(false);
      });
    } else {
      setLoading(true);
      
      client.fetch(feedQuery).then((data) => {
        setPins(data);
        // console.log("2");
        // console.log(data);
        // console.log(pins[0].image.asset.url);
        setLoading(false);
      });
    }
  }, [categoryId]);
  return (
    <div>
      {/* {console.log(pins)} */}
      {pins && (
        <MasonryLayout pins={pins} />
      )}
    </div>
  )
}

export default Feed