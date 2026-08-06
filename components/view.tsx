export default async function View() {
  await new Promise((resolve) => setTimeout(resolve, 20000));
  return (
    <div>
      <h1>30k View Page</h1>
    </div>
  );
}