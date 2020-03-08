import React from "react";
import socketIOClient from "socket.io-client";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import CardHeader from "@material-ui/core/CardHeader";
import sendImage from "./Assests/send.png";
import profilePic from "./Assests/minions.jpg";
import backgroundImage from "./Assests/backgroundImage.png";
import { Button } from "@material-ui/core";
const endpoint = "http://localhost:4001";
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      message: [],
      msg: "",
      isDetails: false,
      userName: "",
      roomName: ""
    };
    const socket = socketIOClient(endpoint);
    socket.on("message", msg => {
      let message = this.state.message;
      if (this.state.isDetails) {
        message.push(msg);
        this.setState({ message: message });
      }
    });
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }
  send = () => {
    const socket = socketIOClient(endpoint);
    if (this.state.msg.length !== 0 && this.state.isDetails)
      socket.emit("message", "room1", this.state.msg);
    this.setState({ msg: "" });
  };
  register = () => {
    const socket = socketIOClient(endpoint);
    socket.emit("joinNewUser", this.state.roomName, this.state.userName);
    alert("You are registered");
    this.setState({ isDetails: true });
  };

  render() {
    return (
      <div
        style={{
          flex: 1,
          backgroundImage: "url(" + backgroundImage + ")",
          backgroundPosition: "center",
          width: "100%",
          height: "100vh",
          backgroundRepeat: "repeat"
        }}
      >
        {this.state.isDetails ? null : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column"
            }}
          >
            <div
              style={{
                display: "flex",
                width: 500,
                height: 100,
                padding: 50
              }}
            >
              <TextField
                label="UserName"
                variant="outlined"
                margin="normal"
                value={this.state.userName}
                autoFocus={true}
                onChange={event =>
                  this.setState({ userName: event.target.value })
                }
              />
              <TextField
                label="Room Name"
                variant="outlined"
                margin="normal"
                value={this.state.roomName}
                style={{ marginLeft: 25 }}
                onChange={event =>
                  this.setState({ roomName: event.target.value })
                }
              />
            </div>
            <Button variant="contained" color="primary" onClick={this.register}>
              Register
            </Button>
          </div>
        )}
        <div
          style={{
            paddingBottom: 180,
            width: "99%",
            paddingTop: 10,
            backgroundImage: "url(" + backgroundImage + ")",
            backgroundPosition: "center",
            paddingLeft: "1%",
            marginLeft: "10"
          }}
        >
          {this.state.message.map((message, index) => (
            <Card
              key={index}
              style={{
                width: "50%",
                marginBottom: 10,
                padding: 10
              }}
            >
              <CardHeader avatar={<Avatar alt="NM" src={profilePic} />} />
              <CardContent style={{ padding: 1 }}>
                <div
                  style={{
                    wordWrap: "break-word",
                    fontSize: 18,
                    fontFamily: "Sans‑serif",
                    whiteSpace: "pre-line"
                  }}
                >
                  {message}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            padding: "10px 0px 0px 10px",
            marginBottom: "20",
            position: "fixed",
            bottom: 0,
            backgroundImage: "url(" + backgroundImage + ")",
            backgroundPosition: "center",
            height: "16%",
            width: "99%"
          }}
        >
          <TextField
            id="standard-basic"
            label="Message"
            margin="normal"
            multiline
            fullWidth
            value={this.state.msg}
            rows={
              this.state.msg.split("\n").length < 5
                ? this.state.msg.split("\n").length
                : 4
            }
            onChange={event => this.setState({ msg: event.target.value })}
          />
          <img
            src={sendImage}
            width={"50vh"}
            height={"50vh"}
            style={{ margin: "1%" }}
            alt={"Send"}
            onClick={this.send}
          />
        </div>
        <div
          style={{ float: "left", clear: "both" }}
          ref={el => {
            this.messagesEnd = el;
          }}
        ></div>
      </div>
    );
  }
}
export default App;
