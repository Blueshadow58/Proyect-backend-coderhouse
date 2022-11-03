process.on("message", (msg) => {
  const randomArray = msg.randomArray;
  const cant = msg.cant;
  const count = {};

  for (let i = 0; i < parseInt(cant); i++) {
    randomArray.push(Math.floor(Math.random() * 1000));
  }
  randomArray.forEach((random) => {
    count[random] = (count[random] || 0) + 1;
  });
  process.send(count);
});
