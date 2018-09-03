function* f() {
  yield console.log(1);
  yield console.log(2);
  yield console.log(3);
}
const fn = f();
fn.next();
fn.next();
fn.next();
fn.next();