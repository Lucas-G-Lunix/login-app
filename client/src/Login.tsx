import React from 'react'
import { useCookies } from 'react-cookie';

export default function Login() {
    const [formData, setFormData] = React.useState({
        email: "",
        password: "",
        passwordConfirm: "",
        newsletter: true,
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [cookieAccessToken, setAccessToken] = useCookies(['accessToken']);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [cookieRefreshToken, setRefreshToken] = useCookies(['refreshToken']);
    function handleChange(event: React.ChangeEvent<HTMLInputElement>){
        const {name, value, checked, type} = event.target
        setFormData(prevState => (
            {
                ...prevState,
                [name]: type === "checkbox" ? checked : value
            }
        ))
    }
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault()
        /*if (formData.password === formData.passwordConfirm){
            console.log(formData)
            console.log("submitted!!")
        } else {
            console.log("Passwords don't match!!")
            return
        }
        if (formData.newsletter){
            console.log("Thanks signin up newsletter!!");
        }*/
       const response = await fetch("http://localhost:5000/api/sessions", 
        {
        method: "POST",
        body: JSON.stringify({email:formData.email, password:formData.password}),
        headers: {
            "Content-Type": "application/json",
          },
       });
       const responseJson = await response.json()
       setAccessToken("accessToken", responseJson.accessToken, {sameSite:"strict"})
       setRefreshToken("refreshToken", responseJson.refreshToken, {sameSite:"strict"})
    }
  return (
    cookieAccessToken.accessToken === null ? <form className="login--container" onSubmit={handleSubmit}>
    <input type="email" id="email--text" placeholder="Email" name="email" value={formData.email} onChange={handleChange}/>
    <input type="password" id="email--password" placeholder="Password" name="password" value={formData.password} onChange={handleChange}/>
    <input type="password" id="email--confirmpass" placeholder="Confirm password" name="passwordConfirm" value={formData.passwordConfirm} onChange={handleChange} />
    <label id="newsletter">
        <input type="checkbox" id="newsletter" name="newsletter" checked={formData.newsletter} onChange={handleChange}/>
        I want to join newsletter
    </label>
    <button>Log In</button>
  </form> : <h1>Logged In</h1>
  )
}
