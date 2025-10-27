const colors = require("colors");
const app = require("./app");
const port = parseInt(process.env.PORT, 10) || 6001;

app.listen(port, () => {
  console.log(
    colors.yellow.bold(
      `--------------------------------------------------------`
    )
  );
  console.log(colors.yellow.bold(`App is running on port : ${port}`));
  console.log(
    colors.yellow.bold(`Current Environment : ${process.env.NODE_ENV}`)
  );
  console.log(
    colors.yellow.bold(
      `--------------------------------------------------------`
    )
  );
});

//commit test test
