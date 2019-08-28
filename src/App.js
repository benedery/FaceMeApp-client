import React, {useState, useEffect} from 'react';
import './App.css';
import Navigation from "./components/Navigation/Navigation";
import Logo from './components/Logo/Logo'
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import Particles from "react-particles-js";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";

const particlesOptions = {
    particles: {
        number: {
            value: 30
        },
        move: {
            radius: 10
        },
        line_linked: {
            shadow: {
                enable: true,
                color: "white",
                blur: 5
            },
        }
    }
};

function App() {
    const [userInput, setUserInput] = useState("")
    const [imgUrl, setImageUrl] = useState("");
    const [box, setBox] = useState({});
    const [route, setRoute] = useState("signin")
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [user, setUser] = useState({
        id: "",
        name: "",
        password: "",
        entries: 0,
        joined: ""
    });

    const onInputChange = (e) => {
        setUserInput(e.target.value);
    }

    const loadUser = (data) => {
        setUser(data)
    };

    useEffect(() => {
        fetch('https://facemeappben.herokuapp.com/')
            .then(res => res.json())
    })

    const calFaceLocation = (data) => {
        const image = document.getElementById('inputimage');
        const height = Number(image.height)
        const width = Number(image.width)
        return setBox({
            leftCol: data.left_col * width,
            topRow: data.top_row * height,
            rightCol: width - (data.right_col * width),
            bottomRow: height - (data.bottom_row * height)
        })
    };

    const onSubmit = () => {
        setImageUrl(userInput)
            fetch('https://facemeappben.herokuapp.com/imageapi', {
                method:'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    input:userInput
                })
            })
                .then(response=> response.json())
                 .then(response => {
                 if (response) {
                    fetch('https://facemeappben.herokuapp.com/image',
                        {
                            method: 'put',
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify({
                                id: user.id
                            })
                        })
                        .then(response => response.json())
                        .then(count => setUser({...user, entries: count}))
                        .catch(console.log)
                        }
                const faceInfo = response.outputs[0].data.regions[0].region_info.bounding_box;
                calFaceLocation(faceInfo)
            }).catch(err=>console.log(err))
            };

    const onRouteChange = (route) => {
        if (route === 'signout') {
            setIsSignedIn(false)
            setImageUrl('');
            setRoute('signin')
        } else if (route === 'home') {
            setIsSignedIn(true)
            setRoute('home')
        }
        else if (route === 'register'){
            setIsSignedIn(false)
            setRoute('register')
        }
        else if (route === 'signin'){
            setRoute('signin')
        }
    };


    return (
        <div className="App">
            <Particles className="particles"
                       params={particlesOptions}/>
            <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange}/>
            {route === 'home' ?
                <div className="App">
                    <Logo/>
                    <Rank name={user.name} entries={user.entries}/>
                    <ImageLinkForm
                        onSubmit={onSubmit}
                        onInputChange={onInputChange}
                    />
                    <FaceRecognition
                        box={box}
                        imgUrl={imgUrl}/>
                </div>
                : (route === 'signin' ?
                        <SignIn
                            onRouteChange={onRouteChange}
                            loadUser={loadUser}
                        />
                        : <Register
                            loadUser={loadUser}
                            onRouteChange={onRouteChange}/>
                )}
        </div>
    )
};

export default App;
