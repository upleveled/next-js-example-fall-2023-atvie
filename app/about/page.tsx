export default function AboutPage() {
  // this is an object
  const myComplexObject = { name: 'lukas', hobby: 'coding' };
  // this is a JS string
  const myComplexObjectAsString = JSON.stringify(myComplexObject);
  console.log(myComplexObjectAsString);
  // this is a JS object
  const myComplexObjectIntoJSAgain = JSON.parse(myComplexObjectAsString);
  console.log(myComplexObjectIntoJSAgain);

  return (
    <>
      <h1>This is my about page</h1>
      <h2>JSON.stringify and JSON.parse</h2>
      <div>{JSON.stringify([undefined, false, '', null])}</div>
      <div>{JSON.stringify(myComplexObject)}</div>
      <div>{myComplexObjectIntoJSAgain.name}</div>
    </>
  );
}
