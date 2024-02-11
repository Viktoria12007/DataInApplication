import "./LoginForm.css";
import { FormField } from "../FormField";
import { Button } from "../Button";
import {FC, FormEvent, useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {loginUser} from "../../api/User";
import {queryClient} from "../../api/queryClient";

export const LoginForm: FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginMutation = useMutation({
        mutationFn: () => loginUser(email, password),
    }, queryClient);

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        loginMutation.mutate();
    }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <FormField label="Email">
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
      </FormField>
      <FormField label="Пароль">
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
      </FormField>
      {loginMutation.error && <span>{loginMutation.error.message}</span>}
      <Button type="submit" isLoading={loginMutation.isPending}>Войти</Button>
    </form>
  );
};
