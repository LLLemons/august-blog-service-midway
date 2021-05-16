const WebFramework = require('@midwayjs/web').Framework;
const SocketFramework = require('@midwayjs/socketio').Framework;
const web = new WebFramework().configure({
  port: 7002,
});

const socket = new SocketFramework().configure({
  port: 7002,
  path: '/editor',
  cors: {
    origin: "http://175.24.95.135:8083",
    methods: ["GET", "POST"]
  }
})

const { Bootstrap } = require('@midwayjs/bootstrap');
Bootstrap.load(web).load(socket).run();
