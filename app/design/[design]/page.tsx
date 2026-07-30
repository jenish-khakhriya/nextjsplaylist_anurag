export default async function Home({params,searchParams} : {params : {design : string}, searchParams : {q : string}}) {
    const {design} = await params;
  const {q} = await searchParams;
    console.log("design", design); // its a dynamic route parameter we can get it from params object
    console.log("q", q); // its a query parameter we can get it from searchParams object

  return (
    <div>home page {design}</div>
  );
}