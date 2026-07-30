export default async function({params,searchParams} : {params : {file_4 : string[]}, searchParams : {q : string}}) {
    const {file_4} = await params;
  const {q} = await searchParams;
    console.log("file_4", file_4); // its a dynamic route parameter we can get it from params object
    console.log("q", q); // its a query parameter we can get it from searchParams object
    return (
    <div>home page /{file_4?.join("/")}</div>
    );
}