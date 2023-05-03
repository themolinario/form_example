import React, {useRef, useState} from 'react';
import './App.css';
import {Box, Container} from "@mui/material";
import {FieldValues, useForm, ValidationRule} from "react-hook-form";
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

/*type RegistrationProps = Yup.ObjectSchema <{
    nome: string;
    cognome: string;
    email: string;
    emailConfirm: string;
    password: string;
    passwordConfirm: string;
} | undefined, object>*/


function App() {
    /*const formSchema: RegistrationProps = Yup.object({
        nome: Yup.string().required("Inserire il nome"),
        cognome: Yup.string().required("Inserire il cognome"),
        email: Yup.string().required("Inserire l'email"),
        emailConfirm: Yup.string()
            .required("Confermare l'email")
            .test( (value: string) => value === email.current),
        password: Yup.string()
            .required("Inserire Password"),
        passwordConfirm: Yup.string()
            .required("Confermare Password")
            .test((value:string) => value === password.current)

    });

     */



    /*const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
        getValues
    } = useForm({
        mode: "onTouched",
        resolver: yupResolver(formSchema)
    });

     */


    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const [posted, setPosted] = useState(false);
    const email = useRef({});
    email.current = watch("email", "");
    const password = useRef('');
    password.current = watch("password", "");

    function onSubmit(data: FieldValues): void {
        console.log(data);
        setPosted(true)
    }

    function onError (): void {
        console.log('wrong', errors);
    }

  return (
    <div className="App">
      <Container maxWidth="md">
          <Box className="formContainer">
            <form onSubmit={handleSubmit(onSubmit, onError)}>
                <Box className="questionContainer">
                    <h3>Nome:</h3>
                    <input type="string" placeholder="Inserire nome.." {...register("nome", {required: true })}/>
                    {errors.nome?.type === 'required' && <p style={{color: "red"}}>Inserire il nome</p>}
                    <h3>Cognome:</h3>
                    <input type="string" placeholder="Inserire cognome.." {...register("cognome", {required: true })}/>
                    {errors.cognome?.type === 'required' && <p style={{color: "red"}}>Inserire il cognome</p>}
                    <h3>E-mail:</h3>
                    <input type="email" placeholder="Inserire email.." {...register("email", {required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/})}/>
                    {errors.email?.type === 'required' && <p style={{color: "red"}}>Inserire l'email</p>}
                    {errors.email?.type === 'pattern' && <p style={{color: "red"}}>Pattern errato</p>}
                    <h3>Conferma E-mail:</h3>
                    <input type="email" placeholder="Inserire email.." {...register("emailConfirm", {required: true,
                    validate: (value, formValues) => value === email.current})}/>
                    {errors.emailConfirm?.type === 'required' && <p style={{color: "red"}}>Confermare l'email</p>}
                    {errors.emailConfirm?.type === 'validate' && <p style={{color: "red"}}>L'email di conferma non è corrispondente</p>}
                    <h3>Password:</h3>
                    <input type="password" placeholder="Inserire password.." {...register("password", {required: true,
                    minLength: 10, pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{10,}$/
                    })}/>
                    {errors.password?.type === 'required' && <p style={{color: "red"}}>Inserire una password</p>}
                    {errors.password?.type === 'minLength' && <p style={{color: "red"}}>Minimo 10 caratteri</p>}
                    {errors.password?.type === 'pattern' && <p style={{color: "red"}}>Minimo un numero ed una lettera maiuscola</p>}
                    <h3>Conferma Password</h3>
                    <input type="password" placeholder="Inserire password.." {...register("passwordConfirm", {required: true,
                        validate: (value) => value === password.current})}/>
                    {errors.passwordConfirm?.type === 'required' && <p style={{color: "red"}}>Confermare la password</p>}
                    {errors.passwordConfirm?.type === 'validate' && <p style={{color: "red"}}>La password di conferma non è corrispondente</p>}

                </Box>
                <input type="submit"/>
                {posted && (<h3>Registrazione correttamente effettuata</h3>)}
            </form>
          </Box>

      </Container>
    </div>
  );
}

export default App;
