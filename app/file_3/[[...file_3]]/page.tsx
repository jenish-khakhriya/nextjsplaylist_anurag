export default async function({params,searchParams} : {params : {file_3 : string[]}, searchParams : {q : string}}) {
    const {file_3} = await params;
  const {q} = await searchParams;
    console.log("file_3", file_3); // its a dynamic route parameter we can get it from params object
    console.log("q", q); // its a query parameter we can get it from searchParams object
    return (
    <div>home page /{file_3?.join("/")}</div>
    );
}