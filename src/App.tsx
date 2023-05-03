import React, { useState } from "react";
import "./App.css";
import { Box, Container } from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";

interface IUserForm {
  nome: string;
  cognome: string;
  email: string;
  emailConfirm: string;
  password: string;
  passwordConfirm: string;
}

function App(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserForm>();

  const [posted, setPosted] = useState(false);

  function onSubmit(data: FieldValues): void {
    console.log(data);
    setPosted(true);
  }

  function onError(): void {
    console.log("wrong", errors);
  }

  return (
    <div className="App">
      <Container maxWidth="md">
        <h1>USER FORM</h1>

        <Box className="formContainer">
          <form onSubmit={handleSubmit(onSubmit, onError)}>
            <Box className="questionContainer">
              <label htmlFor="name">Nome:</label>
              <input
                id="name"
                type="string"
                placeholder="Inserire nome.."
                {...register("nome", { required: true })}
              />
              {errors.nome?.type === "required" && <p style={{ color: "red" }}>Inserire il nome</p>}

              <label htmlFor="cognome">Cognome:</label>
              <input
                id="cognome"
                type="string"
                placeholder="Inserire cognome.."
                {...register("cognome", { required: true })}
              />
              {errors.cognome?.type === "required" && <p style={{ color: "red" }}>Inserire il cognome</p>}

              <label htmlFor="email">E-mail:</label>
              <input
                id="email"
                type="email"
                placeholder="Inserire email.."
                {...register("email", { required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ })}
              />
              {errors.email?.type === "required" && <p style={{ color: "red" }}>Inserire l'email</p>}
              {errors.email?.type === "pattern" && <p style={{ color: "red" }}>Pattern errato</p>}

              <label htmlFor="emailConfirm">Conferma E-mail:</label>
              <input
                id="emailConfirm"
                type="email"
                placeholder="Inserire email.."
                {...register("emailConfirm", {
                  required: true,
                  validate: (value, formValues) => value === formValues.email,
                })}
              />
              {errors.emailConfirm?.type === "required" && <p style={{ color: "red" }}>Confermare l'email</p>}
              {errors.emailConfirm?.type === "validate" && (
                <p style={{ color: "red" }}>L'email di conferma non è corrispondente</p>
              )}

              <label htmlFor="password">Password:</label>
              <input
                id="password"
                type="password"
                placeholder="Inserire password.."
                {...register("password", {
                  required: true,
                  minLength: 10,
                  pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{10,}$/,
                })}
              />
              {errors.password?.type === "required" && <p style={{ color: "red" }}>Inserire una password</p>}
              {errors.password?.type === "minLength" && <p style={{ color: "red" }}>Minimo 10 caratteri</p>}
              {errors.password?.type === "pattern" && (
                <p style={{ color: "red" }}>Minimo un numero ed una lettera maiuscola</p>
              )}

              <label htmlFor="passwordConfirm">Conferma Password</label>
              <input
                id="passwordConfirm"
                type="password"
                placeholder="Inserire password.."
                {...register("passwordConfirm", {
                  required: true,
                  validate: (value, formValues) => value === formValues.password,
                })}
              />
              {errors.passwordConfirm?.type === "required" && (
                <p style={{ color: "red" }}>Confermare la password</p>
              )}
              {errors.passwordConfirm?.type === "validate" && (
                <p style={{ color: "red" }}>La password di conferma non è corrispondente</p>
              )}
            </Box>

            <button type="submit">SUBMIT</button>

            {posted && <h2>Registrazione correttamente effettuata</h2>}
          </form>
        </Box>
      </Container>
    </div>
  );
}

export default App;
