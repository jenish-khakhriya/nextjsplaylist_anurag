

import { useState } from "react";

export default function Like() {
    const [likeCount, setLikeCount] = useState(0);
  console.log("like component rendered");
    
  return (
    <div onClick={() => {
        setLikeCount(prev => prev + 1);
    }}>
      <p>Like Count: {likeCount}</p>
    </div>
  );
}