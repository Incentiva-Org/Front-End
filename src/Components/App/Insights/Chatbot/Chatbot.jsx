import React, {useState, useEffect, useRef} from "react"
import { Typography, Paper, Grid, InputBase, Divider, IconButton, withStyles, Badge, InputAdornment, FormControl, Avatar } from "@material-ui/core"
import "./styles.css"
import { Send, Message } from "@material-ui/icons"
import {motion} from "framer-motion"
import ChatbotImg from "./chatbot.svg"

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: '#44b700',
    color: '#44b700',
    bottom: 0,
    right: 0,
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))(Badge);


localStorage.setItem("messages", JSON.stringify(
    [
        {Text: "Hi, how are you?", Author: "Chatbot"},
    ]
))

const ChatbotAvatar = () => {
    return (
        <StyledBadge
            overlap="circular"
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            variant="dot"
            style={{borderRadius: "50%", background: "inherit", border: "2px solid rgb(150, 150, 150)", display: "inline-block"}}
        >
            <Avatar alt="Chatbot" src={ChatbotImg} />
        </StyledBadge>
    )
}

const Chatbot = () => {
    var currMessages = JSON.parse(localStorage.getItem('messages'))

    const [message, setMessage] = useState('')

    const sendMessage = (e) => {
        e.preventDefault()
        if(message !== "") {
            var currUserMessages = JSON.parse(localStorage.getItem("messages"));
            currUserMessages.push({Text: message, Author: "Client"})
            setMessage("")
            localStorage.setItem("messages", JSON.stringify(currUserMessages))
        }
    }

    const messageEl = useRef(null);

    useEffect(() => {
        if (messageEl) {
        messageEl.current.addEventListener('DOMNodeInserted', event => {
            const { currentTarget: target } = event;
            target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
        });
        }
    }, [])

    const handleKeypress = (e) => {
        //it triggers by pressing the enter key
      if (e.keyCode === 13) {
        sendMessage();
        console.log('sent')
      }
    };

    return (
        <Paper style={{maxWidth: "400px", height: "550px", borderRadius: "30px", margin: "40px auto"}} elevation={4}>
            <div style={{padding: "20px"}}>
                <ChatbotAvatar />
                <Typography variant="h6" style={{fontWeight: "bold", display: "inline-block", marginLeft: "10px", lineHeight: "35px"}}>Chatbot</Typography>
            </div>
            <Divider origntation="horizontal" />
            <div ref={messageEl} style={{height: "400px", overflowY: "scroll", padding: "10px", display: "flex", flexDirection: "column", background: "inherit"}}>
                {currMessages.map((message, idx) => (
                    <motion.p initial={{opacity: 0, y: 5}} animate={{opacity: 1, y: 0}} transition={{duration: 0.2}} className={message.Author === "Client" ? "from-me" : "from-them"}>{message.Text}</motion.p>
                ))}
            </div>
            <Divider orientation="horizontal" />
            <div style={{padding: "10px 20px"}}>
                <form onSubmit={sendMessage}>
                    <FormControl variant="outlined" fullWidth>
                        <InputBase
                            placeholder="Type something here..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            fullWidth
                            onKeyPress={handleKeypress}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton color="primary" onClick={sendMessage}>
                                        <Send />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </form>
            </div>
        </Paper>
    )
}
export default Chatbot