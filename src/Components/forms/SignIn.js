import React from "react";
import { useContext } from "react";
import { StoreConsumer } from "../Store";
const SignIn = () => {
   const { handleSubmitForm, handleForms, handleStepUp, nickName, password } = useContext(StoreConsumer);
   return (
      <>
         <div className="form">
            <form onSubmit={handleSubmitForm}>
               <h2>Log in</h2>
               <label htmlFor="LogIn">Nickname</label>
               <input type="text" name="nickName" value={nickName} onChange={handleForms} />
               <label htmlFor="password">Password</label>
               <input type="password" name="password" value={password} onChange={handleForms} />
               <button className="form-btn">Log in</button>
            </form>
            <h3>OR</h3>
            <button className="signUp-btn" onClick={handleStepUp}>
               Sign up
            </button>
         </div>
      </>
   );
};
export default SignIn;
//{ nickName, password, handleForms, handleStepUp, handleSubmitForm }