const express = require('express');
const nodeMailer = require('nodemailer');
const bodyParser = require('body-parser');
const nodeCron = require('node-cron');

const app = express();

let transporter = nodeMailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'todo.app.web@gmail.com',
    pass: 'bishapbhusal'
  }
});

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(bodyParser.json())

app.post('/todo', (req, res) => {
  console.log('listened the request', req.body);
  const receiver = req.body.email;
  const name = req.body.name;
  const task = req.body.task;
  const time = req.body.timeOut;
  const dateTime = new Date(time)
  console.log(dateTime);
  const hrs = dateTime.getHours() - 1;
  const min = dateTime.getMinutes();
  const day = dateTime.getDate();
  const month = dateTime.getMonth() + 1;

  const scheduler = nodeCron.schedule(
    `01 ${min} ${hrs} ${day} ${month} *`,
    function () {

      const config = {
        from: 'todo.app.web@gmail.com',
        to: `${receiver}`,
        subject: 'Complete Your Task Before Deadline',
        html: `<h1> Hello ${name}, Please Complete your Task Before Deadline </h1> <h4> Your Task : ${task} , deadline is about to end. </h4>`
      }
      transporter.sendMail(config, function (err, data) {
        if (err) {
          console.warn(err)
        } else {
          console.warn(data, 'Mail Sent Successfully')
        }
      })

    }
  )
  scheduler.start()
})



app.listen(3000, () => console.log('server started at port 3000'));