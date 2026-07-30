export default async function({params,searchParams} : {params : {file_2 : string[]}, searchParams : {q : string}}) {
    const {file_2} = await params;
  const {q} = await searchParams;
    console.log("file_2", file_2); // its a dynamic route parameter we can get it from params object
    console.log("q", q); // its a query parameter we can get it from searchParams object
    return (
    <div>home page /{file_2?.join("/")}</div>
    );
}