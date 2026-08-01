
// see in dynamic we can overwrite root layout metadata see with the help of absolute property in title and also we can set dynamic metadata with the help of generateMetadata function and also we can get query parameter from searchParams object
export async function generateMetadata({params} : {params : Promise<{blog : string,slug : string}>}){
  const {blog,slug} = await params;
  return {
    title : {
      absolute : `${slug} - ${blog} | Blog`,
    },
    description : `This is ${slug} page for ${blog}`
  }
}



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