import Comment from "@/components/comment";
import Like from "@/components/like";
import View from "@/components/view";
import { Suspense } from "react";

export default function() {
  return (
    <div>
        <Suspense fallback={<div>Like loading</div>}><Like/></Suspense>
      <Suspense fallback={<div>View loading</div>}><View/></Suspense>
      <Suspense fallback={<div>Comment loading</div>}><Comment/></Suspense>
    </div>
  );
}