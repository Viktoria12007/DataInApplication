import { FormField } from "../FormField";
import { Button } from "../Button";
import "./RegisterForm.css";
import {FC, FormEvent, useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {registerUser} from "../../api/User";
import {queryClient} from "../../api/queryClient";

export const RegisterForm: FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const registerMutation = useMutation({
        mutationFn: () => registerUser(username, email, password),
    }, queryClient);

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        registerMutation.mutate();
    }

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <FormField label="Имя">
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
      </FormField>
      <FormField label="Email">
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
      </FormField>
      <FormField label="Пароль">
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
      </FormField>
      {registerMutation.error && <span>{registerMutation.error.message}</span>}
      <Button type="submit" isLoading={registerMutation.isPending}>Зарегистрироваться</Button>
    </form>
  );
};
