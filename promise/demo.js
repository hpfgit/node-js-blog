// new Promise((resolve, reject)=>{
//   setTimeout(()=>{
//     try {
//       console.log('成功了');
//       resolve(true);
//     }catch (e) {
//       reject(e);
//     }
//   },200)
// }).then(data=>{
//   console.log(data);
//   // return '123';
//   return new Promise((resolve,reject)=>{
//     reject('123');
//   });
// }, (err)=>{
//   console.log(err);
// }).catch(err=>{
//   console.log(err);
// });
// .then(data=>{
//   console.log(data);
// },err=>{
//   console.log(err);
// });
// then 必须接受一个一个成功的函数
// catch 代替

const p1 = new Promise((resolve,reject)=>{});
const p2 = new Promise((resolve,reject)=>{});
const p3 = new Promise((resolve,reject)=>{});

// const p = Promise.all([p1,p2,p3]); // 并发

const p = Promise.race([p1,p2,p3]); // 竞速