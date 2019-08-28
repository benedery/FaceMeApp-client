import React, {useState} from 'react';

const Register = ({onRouteChange, loadUser}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const onEmailChange = (e) => {
        setEmail(e.target.value)
    }
    const onPasswordChange = (e) => {
        setPassword(e.target.value)
    }
    const onNameChange = (e) => {
        setName(e.target.value)
    }

    const onSubmitSignIn = (e) => {
        e.preventDefault()
        fetch('https://facemeappben.herokuapp.com/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name,
                email,
                password
            })
        }).then(res => {
            if (!res.ok) {
               return console.log('my api returned an error')
            }
            return res.json()
         })
            .then(data => {
                if (data){
                    loadUser(data)
                    onRouteChange('home')
                }
            })
    };

    return (
        <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
                <form className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text"
                                   name="name"  id="name"
                            onChange={(e)=> onNameChange(e)}
                            />
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email"
                                   name="email-address"  id="email-address"
                                   onChange={(e)=> onEmailChange(e)}/>
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                   type="password"
                                   name="password"  id="password"
                                   onChange={(e)=> onPasswordChange(e)}
                            />
                        </div>
                    </fieldset>
                    <div className="">
                        <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit"
                               onClick={(e)=>onSubmitSignIn(e)}
                               value="Sign in"/>
                    </div>
                </form>
            </main>
        </article>
    )
};

export default Register