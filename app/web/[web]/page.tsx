export default async function Web({params} : {params : {web : string}}) {
    const {web} = await params;
  return (
    <div>home page {web}</div>
  );
}