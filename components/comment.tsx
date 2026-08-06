export default async function Comment() {
  await new Promise((resolve) => setTimeout(resolve, 30000));
  return (
    <div>
      <h1>50 Comment Page</h1>
    </div>
  );
}