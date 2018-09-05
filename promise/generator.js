function* f() {
  yield console.log(1);
  yield console.log(1);
  yield console.log(1);
  return console.log(1);
}
const iter = f();
for (let number of iter) {

}