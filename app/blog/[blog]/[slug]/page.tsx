export default async function BlogSlug({params,searchParams} : {params : {blog : string, slug : string}, searchParams : {q : string}}) {
    const {blog,slug} = await params;
  const {q} = await searchParams;
    console.log("blog", blog); // its a dynamic route parameter we can get it from params object
    console.log("slug", slug); // its a dynamic route parameter we can get it from params object
    console.log("q", q); // its a query parameter we can get it from searchParams object

  return (
    <div>blog page {blog}/{slug}</div>
  );
}