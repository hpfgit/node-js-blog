async function f() {
  const a = await new Promise(resolve => {setTimeout(()=>{
    console.log('000');
    resolve('123');
  },200)});
  console.log(a);
}
f();